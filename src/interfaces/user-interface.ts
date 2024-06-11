export interface IUser {
  email: string;
  username: string;
  role: string;
}

export interface ICategory {
  name: string;
  permissions: {
    read: string[];
    write: string[];
  };
}

export interface ITopic {
  name: string;
  permissions: {
    images: boolean;
    videos: boolean;
    texts: boolean;
  };
}