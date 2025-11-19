import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

// Redux RTK Query imports
import {
  useAddConversationMutation,
  useAddMessageMutation,
  useGetConversationTwoUsersQuery,
  useGetMessageByConversationQuery,
} from "@/redux/features/chat/chatApi";
import { setConversationId } from "@/redux/features/chat/chatSlice";

// Local components and utilities
import { KeyboardSpacer } from "@/components/keyboard/KeyboardSpacer";
import { BASE_URL } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import useGetTranslation from "@/hooks/useGetTranslation";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";
import { RootState } from "@/redux/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { Redirect } from "expo-router";
import MessageBubble from "./MessageBubble";

const SOCKET_URL = "wss://silversitting.eu:8443"; // Your WebSocket URL

interface IProps {
  receiverId: string;
}

export default function ChattingScreen({ receiverId }: IProps) {
  const trans = useGetTranslation();

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { conversationId = "" } = useSelector((state: RootState) => state.chat);

  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [currentAllMessages, setCurrentAllMessages] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const socket = useRef<any>(null);
  const flatListRef = useRef<FlatList>(null);

  const [loginModalShow, setLoginModalShow] = useState(false);

  // RTK Query hooks
  //   const {
  //     data: conversationData,
  //     isLoading: conversationLoading,
  //     isSuccess: conversationSuccess,
  //     isError: conversationError,
  //   } = useGetConversationTwoUsersQuery(skipToken,
  //     {
  //       firstUserId: user?._id || "",
  //       secondUserId: typeof receiverId === "string" ? receiverId : "",
  //     },
  //     { skip: !user?._id || !receiverId }
  //   );

  const shouldSkip = !user?._id || !receiverId;

  const {
    data: conversationData,
    isLoading: conversationLoading,
    isSuccess: conversationSuccess,
    isError: conversationError,
  } = useGetConversationTwoUsersQuery(
    shouldSkip
      ? skipToken
      : {
          firstUserId: user._id,
          secondUserId: typeof receiverId === "string" ? receiverId : "",
        }
  );

  const {
    data: messages,
    isLoading: messagesLoading,
    refetch,
  } = useGetMessageByConversationQuery(
    shouldSkip && !conversationId ? skipToken : conversationId
  );

  const [addConversation] = useAddConversationMutation();
  const [addMessage, { isLoading: messageLoading }] = useAddMessageMutation();
  const { data: senderInfo }: any = useGetSingleUserQuery(
    typeof receiverId === "string" ? receiverId : "",
    {
      skip: !receiverId,
    }
  );

  useEffect(() => {
    if (conversationId) {
      refetch();
    }
  }, [conversationId]);

  // WebSocket connection and listeners
  const reconnectWebSocket = () => {
    if (socket.current) {
      socket.current.disconnect();
    }
    socket.current = io(SOCKET_URL, { transports: ["websocket"] }); // Specify transports for RN

    socket.current.on("connect", () => {
      if (user?._id) {
        socket.current.emit("addUser", user._id);
      }
    });

    socket.current.on("getMessage", (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(), // Use client-side timestamp for arrival
      });
    });

    socket.current.on("getUsers", (users: any[]) => {
      setOnlineUsers(users);
    });

    socket.current.on("error", (error: any) => {
      // Implement specific error handling if needed
    });

    socket.current.on("disconnect", (reason: string) => {
      if (reason !== "io client disconnect") {
        // Attempt to reconnect if not a manual disconnect
        setTimeout(reconnectWebSocket, 5000);
      }
    });
  };

  useEffect(() => {
    reconnectWebSocket();
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user?._id]); // Reconnect if user changes

  // Update messages on arrival
  useEffect(() => {
    if (arrivalMessage && receiverId && receiverId === arrivalMessage.sender) {
      setCurrentAllMessages((prev) => [...prev, arrivalMessage]);
      scrollToBottom();
    }
  }, [arrivalMessage, receiverId]);

  // Set initial conversation ID and messages
  useEffect(() => {
    if (conversationSuccess && conversationData && user) {
      dispatch(setConversationId(conversationData._id));
    }
  }, [conversationSuccess, conversationData, user, dispatch]);

  useEffect(() => {
    if (messages) {
      setCurrentAllMessages(messages);
      scrollToBottom();
    }
  }, [messages]);

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" withAnchor={false} />;
  }

  const isReceiverOnline = (id: string) => {
    return onlineUsers.some((u) => u.userId === id);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const createConversation = async (): Promise<string | null> => {
    const data = {
      senderId: user?._id,
      receiverId: typeof receiverId === "string" ? receiverId : "",
    };

    try {
      const res: any = await addConversation(data).unwrap();
      if (res?._id) {
        dispatch(setConversationId(res._id));
        return res._id;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!user) {
      setLoginModalShow(true);
      return;
    }

    if (!inputMessage || inputMessage.trim().length === 0) {
      return;
    }

    let convId = conversationId;
    if (!convId) {
      convId = await createConversation();
      if (!convId) {
        Alert.alert(
          "Error",
          "Failed to create conversation. Please try again."
        );
        return;
      }
    }

    const messageData = {
      conversationId: convId,
      sender: user._id,
      text: inputMessage,
    };

    try {
      const res: any = await addMessage(messageData);
      if (res.data) {
        setInputMessage("");
        setCurrentAllMessages((prev) => [...prev, res.data]); // Add sent message to local state
        scrollToBottom();

        const targetReceiverId =
          typeof receiverId === "string" ? receiverId : "";
        if (isReceiverOnline(targetReceiverId)) {
          console.log("Sending WebSocket message:", messageData);
          socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: targetReceiverId,
            text: inputMessage,
          });
        } else {
          // Assuming your API route for email notification is '/api/conversation/send-email-notification'
          await fetch(`${BASE_URL}/conversation/send-email-notification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              receiverId: targetReceiverId,
              senderId: user._id,
              messageText: inputMessage,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Backend email notification response:", data);
            })
            .catch((error) => {
              console.error("Error initiating email notification:", error);
            });
        }
      } else {
        console.log("Failed to send message:", res.error);
        Alert.alert("Error", "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("HTTP message send error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while sending the message."
      );
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Main Chat Container */}

      {/* Chat Header (Profile Info) */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <Image
          source={
            senderInfo?.image
              ? { uri: senderInfo.image }
              : {
                  uri: "https://silversittingbucket.s3.eu-central-1.amazonaws.com/menIcon.png",
                }
          }
          style={styles.chatProfileImage}
          className="rounded-full mr-3"
        />
        <Text className="text-lg font-semibold text-gray-800">
          {senderInfo?.firstName} {senderInfo?.lastName}
        </Text>
      </View>

      {/* Messages List */}
      {conversationLoading || messagesLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#8b3888" />
          <Text className="text-gray-600 mt-2">Loading messages...</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={currentAllMessages}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isOwnMessage={item.sender === user?._id}
              senderProfileImage={
                item.sender !== user?._id ? senderInfo?.image : undefined
              }
            />
          )}
          contentContainerStyle={styles.messageListContent}
          onContentSizeChange={() => scrollToBottom()} // Auto-scroll on new messages
          onLayout={() => scrollToBottom()} // Auto-scroll on initial layout
        />
      )}

      {/* Message Input Area */}

      <View className="flex-row items-end px-4 py-3 border-t border-gray-200 bg-white gap-3">
        <View className="flex-1 rounded-xl border border-gray-300">
          <TextInput
            multiline
            placeholder={`${trans("typeMessage")} ${senderInfo?.firstName || ""} ${senderInfo?.lastName || ""}...`}
            value={inputMessage}
            onChangeText={setInputMessage}
            textColor="#000"
            style={{
              fontSize: 16,
              minHeight: 40,
              maxHeight: 120,
              backgroundColor: "transparent",
              padding: 0, // Remove internal padding for better alignment
            }}
            className="text-base text-black"
            underlineColorAndroid="transparent"
            selectionColor="transparent" // Optional: custom caret color
            activeUnderlineColor="transparent"
          />
        </View>

        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={messageLoading || !inputMessage.trim()}
          className={`w-[70px] h-[40px] justify-center items-center rounded-full bg-primary ${
            messageLoading || !inputMessage.trim() ? "opacity-50" : ""
          }`}
        >
          {messageLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className="text-white font-semibold text-sm">
              {trans("send")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <KeyboardSpacer reduceHeight={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  chatProfileImage: {
    width: 48,
    height: 48,
  },
  messageListContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputOutline: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#000000",
  },
  sendButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
