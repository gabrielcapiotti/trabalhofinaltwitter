import User from "./User"; 
import {TweetType} from "../types/TweetType"; 

export default class Tweet {
    private static idCounter: number = 1;
    private id: number;
    public author: User;
    public content: string;
    public type: TweetType;
    public likes: number;
    public replies: Tweet[];

    constructor(
        author: User, 
        content: string, 
        type: TweetType = TweetType.Normal
    ) 
    {
        this.id = Tweet.idCounter++;
        this.author = author;
        this.content = content;
        this.type = type;
        this.likes = 0;
        this.replies = [];
    }

    like() {
        this.likes++;
        console.log(`${this.author.username}'s tweet liked. Total likes: ${this.likes}`);
    }

    addReply(reply: Tweet) {
        this.replies.push(reply);
        console.log(`Reply added to ${this.author.username}'s tweet: "${reply.content}"`);
    }

    getId(): number {
        return this.id;
    }
}

export class TweetService {
    private static tweets: Tweet[] = [];

    static createTweet(author: User, content: string, type: TweetType = TweetType.Normal) {
        const newTweet = new Tweet(author, content, type);
        TweetService.tweets.push(newTweet);
        console.log(`${author.username} tweeted: "${content}"`);
    }

    static getTweets(): Tweet[] {
        return TweetService.tweets;
    }

    static getTweetById(id: number): Tweet | undefined {
        return TweetService.tweets.find(tweet => tweet.getId() === id);
    }

    static displayTweet(id: number): void {
        const tweet = this.getTweetById(id);
        if (!tweet) {
            console.log("Tweet not found.");
            return;
        }
        const replies = tweet.replies.map(reply => `> @${reply.author.username}: ${reply.content}`).join('\n');
        const likesDisplay = this.formatLikes(tweet);

        console.log(`@${tweet.author.username}: ${tweet.content}\nLikes: ${likesDisplay}\nReplies:\n${replies}`);
    }

    static formatLikes(tweet: Tweet): string {
        if (tweet.likes === 0) return "No likes";
        if (tweet.likes === 1) return `@${tweet.author.username} liked`;
        return `@${tweet.author.username} and ${tweet.likes - 1} others liked`;
    }

    static likeTweet(id: number): void {
        const tweet = this.getTweetById(id);
        if (tweet) {
            tweet.like();
        } else {
            console.log("Tweet not found.");
        }
    }

    static replyToTweet(id: number, author: User, content: string): void {
        const tweet = this.getTweetById(id);
        if (tweet) {
            const reply = new Tweet(author, content, TweetType.Reply);
            tweet.addReply(reply);
        } else {
            console.log("Tweet not found.");
        }
    }
}
