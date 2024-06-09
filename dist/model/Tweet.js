"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetService = void 0;
const TweetType_1 = __importDefault(require("../types/TweetType"));
class Tweet {
    constructor(author, content, type = TweetType_1.default.Normal) {
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
    addReply(content) {
        const reply = new Tweet(this.author, content, TweetType_1.default.Reply);
        this.replies.push(reply);
        console.log(`Reply added to ${this.author.username}'s tweet: "${content}"`);
    }
    getId() {
        return this.id;
    }
}
Tweet.idCounter = 1;
exports.default = Tweet;
class TweetService {
    static createTweet(author, content, type = TweetType_1.default.Normal) {
        const newTweet = new Tweet(author, content, type); // Cria um novo tweet
        TweetService.tweets.push(newTweet); // Adiciona o tweet à lista de tweets
        console.log(`${author.username} tweeted: "${content}"`); // Mensagem indicando que o tweet foi criado com sucesso
    }
    static getTweets() {
        return TweetService.tweets; // Retorna a lista de tweets
    }
    static getTweetById(id) {
        return TweetService.tweets.find(tweet => tweet.getId() === id); // Retorna o tweet com o ID especificado, se encontrado
    }
    static displayTweet(id) {
        const tweet = this.getTweetById(id);
        if (!tweet) {
            console.log("Tweet not found.");
            return;
        }
        const replies = tweet.replies.map(reply => `> @${reply.author.username}: ${reply.content}`).join('\n');
        const likesDisplay = this.formatLikes(tweet);
        console.log(`@${tweet.author.username}: ${tweet.content}\n${likesDisplay}\n${replies}`);
    }
    static formatLikes(tweet) {
        if (tweet.likes === 0)
            return "";
        if (tweet.likes === 1)
            return `@${tweet.author.username} liked`;
        return `@${tweet.author.username} and ${tweet.likes - 1} others liked`;
    }
    static likeTweet(id) {
        const tweet = this.getTweetById(id);
        if (tweet) {
            tweet.like();
        }
        else {
            console.log("Tweet not found.");
        }
    }
    static replyToTweet(id, author, content) {
        const tweet = this.getTweetById(id);
        if (tweet) {
            tweet.addReply(content);
        }
        else {
            console.log("Tweet not found.");
        }
    }
}
exports.TweetService = TweetService;
TweetService.tweets = []; // Lista de tweets
