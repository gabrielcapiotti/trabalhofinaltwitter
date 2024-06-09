"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./model/User"); // Importando User e UserService
const Tweet_1 = require("./model/Tweet"); // Importando Tweet e TweetService
const TweetType_1 = __importDefault(require("./types/TweetType")); // Importando a enumeração TweetType
// Criação de Usuários
User_1.UserService.createUser("john_doe", "john@example.com", "password123");
User_1.UserService.createUser("jane_doe", "jane@example.com", "password123");
// Busca de Usuários
const john = User_1.UserService.getUserByUsername("john_doe");
const jane = User_1.UserService.getUserByUsername("jane_doe");
// Criação de Tweets
if (john && jane) {
    Tweet_1.TweetService.createTweet(john, "Hello world!", TweetType_1.default.Normal);
    Tweet_1.TweetService.createTweet(jane, "Hi there!", TweetType_1.default.Normal);
    // Like no Tweet
    const tweets = Tweet_1.TweetService.getTweets();
    if (tweets.length > 0) {
        Tweet_1.TweetService.likeTweet(tweets[0].getId());
    }
    // Responder ao Tweet
    const tweet = Tweet_1.TweetService.getTweets()[0];
    if (tweet) {
        Tweet_1.TweetService.replyToTweet(tweet.getId(), jane, "Nice to see you here!");
    }
    // Exibir o Tweet com Likes e Replies
    Tweet_1.TweetService.displayTweet(tweet.getId());
}
