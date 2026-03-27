// @ts-nocheck
/**
 * 通用认证上下文
 *
 * 基于固定的 API 接口实现，可复用到其他项目
 * 其他项目使用时，只需修改 @api 的导入路径指向项目的 api 模块
 *
 * 注意：
 * - 如果需要登录/鉴权场景，请扩展本文件，完善 login/logout、token 管理、用户信息获取与刷新等逻辑
 * - 将示例中的占位实现替换为项目实际的接口调用与状态管理
 */
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserOut {
  id?: string;
  email?: string;
  nickname?: string;
  bio?: string;
  avatar?: string;
  journalCount?: number;
  chatCount?: number;
  reviewCount?: number;
}

interface AuthContextType {
  user: UserOut | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserOut>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 虚拟用户数据（用于对外展示）
const MOCK_USER: UserOut = {
  id: "mock-user-001",
  email: "demo@aidiary.com",
  nickname: "小森林",
  bio: "在喧嚣的世界里，寻找内心的宁静 ✨",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  journalCount: 28,
  chatCount: 15,
  reviewCount: 8,
};

const MOCK_TOKEN = "mock-token-demo-2024";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserOut | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化：自动登录虚拟账号
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 检查本地存储
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          // 首次使用，自动登录虚拟账号
          await AsyncStorage.setItem("user", JSON.stringify(MOCK_USER));
          await AsyncStorage.setItem("token", MOCK_TOKEN);
          setUser(MOCK_USER);
          setToken(MOCK_TOKEN);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("初始化认证失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<void> => {
    try {
      // 模拟登录延迟
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 保存到本地存储
      await AsyncStorage.setItem("user", JSON.stringify(MOCK_USER));
      await AsyncStorage.setItem("token", MOCK_TOKEN);

      setUser(MOCK_USER);
      setToken(MOCK_TOKEN);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("登录失败:", error);
      throw new Error("登录失败");
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");

      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("登出失败:", error);
    }
  };

  const updateUser = (userData: Partial<UserOut>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
