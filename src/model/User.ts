import Tweet from './Tweet';
import { TweetType } from  '../types/TweetType';

export default class User {
    private static idCounter = 0;
    private id: number;
    public username: string;
    private email: string;
    private password: string;
    public followers: User[];
    public following: User[];
    private tweets: Tweet[];

    constructor(
        username: string,
        email: string,
        password: string,
    ) {
        this.id = User.idCounter++;
        this.username = username;
        this.email = email;
        this.password = password;
        this.followers = [];
        this.following = [];
        this.tweets = [];
    }

    follow(user: User) {
        if (user === this) {
            throw new Error("You cannot follow yourself.");
        }

        if (!this.following.includes(user)) {
            this.following.push(user);
            user.addFollower(this);
        }
    }

    addFollower(user: User) {
        this.followers.push(user);
    }

    unfollow(user: User) {
        const index = this.following.indexOf(user);

        if (index !== -1) {
            this.following.splice(index, 1);
            user.removeFollower(this);
            console.log(`${this.username} has unfollowed ${user.username}`);
        } else {
            console.log(`${this.username} does not follow ${user.username}`);
        }
    }

    removeFollower(user: User) {
        const index = this.followers.indexOf(user);
        if (index !== -1) {
            this.followers.splice(index, 1);
        }
    }

    addTweet(tweet: Tweet) {
        this.tweets.push(tweet);
    }

    likeTweet(tweet: Tweet) {
        tweet.like();
    }
    
    replyTweet(tweet: Tweet, content: string) {
        const reply = new Tweet(this, content, TweetType.Reply);
        tweet.addReply(reply);
    }
    
    getId(): number {
        return this.id;
    }

    getTweets(): Tweet[] {
        return this.tweets;
    }

    getFollowing(): User[] {
        return this.following;
    }
}

export class UserService {
    private static users: User[] = [];

    static createUser(username: string, email: string, password: string) {
        if (UserService.getUserByUsername(username)) {
            throw new Error("Username already exists.");
        }
        const newUser = new User(username, email, password);
        UserService.users.push(newUser);
        console.log(`User ${username} created.`);
    }

    static getUsers(): User[] {
        return UserService.users;
    }

    static getUserById(id: number): User | undefined {
        return UserService.users.find(user => user.getId() === id);
    }

    static getUserByUsername(username: string): User | undefined {
        return UserService.users.find(user => user.username === username);
    }

    static followUser(followerUsername: string, followingUsername: string) {
        const follower = UserService.getUserByUsername(followerUsername);
        const following = UserService.getUserByUsername(followingUsername);
        if (follower && following) {
            follower.follow(following);
            console.log(`${followerUsername} is now following ${followingUsername}`);
        } else {
            console.log("User not found.");
        }
    }
}
