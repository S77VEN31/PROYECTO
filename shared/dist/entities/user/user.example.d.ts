/**
 * @fileoverview Example usage of User types
 * Demonstrates data modeling with user objects
 */
import { User, UserCreate, UserUpdate } from "../../entities";
/**
 * Example of a user creation model
 */
declare const newUserModel: UserCreate;
/**
 * Example of a complete user model as stored in the database
 */
declare const userModel: User;
/**
 * Example of a user update model
 */
declare const userUpdateModel: UserUpdate;
/**
 * Example of a user with different role
 */
declare const serverUserModel: UserCreate;
export { newUserModel, serverUserModel, userModel, userUpdateModel };
