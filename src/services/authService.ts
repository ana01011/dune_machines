export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
  private mockUser: AuthUser | null = null;

  async signUp(email: string, password: string, name: string) {
    await delay(800);

    try {
      this.mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('auth_user', JSON.stringify(this.mockUser));

      return {
        data: { user: this.mockUser },
        error: null
      };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to sign up' }
      };
    }
  }

  async signIn(email: string, password: string) {
    await delay(800);

    try {
      if (email === TEST_USER.email && password === TEST_USER.password) {
        this.mockUser = {
          id: 'test-user-123',
          email: TEST_USER.email,
          name: 'Test User',
          created_at: new Date().toISOString(),
        };

        localStorage.setItem('auth_user', JSON.stringify(this.mockUser));

        return {
          data: { user: this.mockUser },
          error: null
        };
      }

      return {
        data: null,
        error: { message: 'Invalid email or password' }
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to sign in' }
      };
    }
  }

  async signInWithGoogle() {
    await delay(800);

    try {
      this.mockUser = {
        id: 'google-user-' + Math.random().toString(36).substr(2, 9),
        email: 'user@gmail.com',
        name: 'Google User',
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('auth_user', JSON.stringify(this.mockUser));

      return {
        data: { user: this.mockUser },
        error: null
      };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to sign in with Google' }
      };
    }
  }

  async signOut() {
    await delay(500);

    try {
      this.mockUser = null;
      localStorage.removeItem('auth_user');

      return { error: null };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {
        error: { message: error.message || 'Failed to sign out' }
      };
    }
  }

  async resetPassword(email: string) {
    await delay(800);

    try {
      return {
        data: { message: 'Password reset email sent' },
        error: null
      };
    } catch (error: any) {
      console.error('Reset password error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to send reset email' }
      };
    }
  }

  async updatePassword(newPassword: string) {
    await delay(800);

    try {
      return {
        data: { message: 'Password updated successfully' },
        error: null
      };
    } catch (error: any) {
      console.error('Update password error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to update password' }
      };
    }
  }

  async verifyOtp(email: string, token: string) {
    await delay(800);

    try {
      if (token === '123456') {
        this.mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: 'Verified User',
          created_at: new Date().toISOString(),
        };

        localStorage.setItem('auth_user', JSON.stringify(this.mockUser));

        return {
          data: { user: this.mockUser },
          error: null
        };
      }

      return {
        data: null,
        error: { message: 'Invalid verification code' }
      };
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to verify OTP' }
      };
    }
  }

  async resendOtp(email: string) {
    await delay(500);

    try {
      return {
        data: { message: 'OTP resent successfully' },
        error: null
      };
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      return {
        data: null,
        error: { message: error.message || 'Failed to resend OTP' }
      };
    }
  }

  async getCurrentUser() {
    try {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        this.mockUser = JSON.parse(stored);
        return { user: this.mockUser, error: null };
      }
      return { user: null, error: null };
    } catch (error: any) {
      console.error('Get current user error:', error);
      return {
        user: null,
        error: { message: error.message || 'Failed to get user' }
      };
    }
  }

  async getSession() {
    try {
      const user = await this.getCurrentUser();
      if (user.user) {
        return {
          session: { user: user.user, access_token: 'mock-token' },
          error: null
        };
      }
      return { session: null, error: null };
    } catch (error: any) {
      console.error('Get session error:', error);
      return {
        session: null,
        error: { message: error.message || 'Failed to get session' }
      };
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  }
}

export const authService = new AuthService();
