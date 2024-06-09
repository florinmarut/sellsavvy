import { UserDTO } from './user.model';

interface UserFollow {
  id: string;
  followerId: string;
  follower: UserDTO;
  followeeId: string;
  followee: UserDTO;
}

export default UserFollow;
