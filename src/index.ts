import User, { UserService } from './model/User'; // Importando User e UserService
import Tweet, { TweetService } from './model/Tweet'; // Importando Tweet e TweetService
import TweetType from './types/TweetType'; // Importando a enumeração TweetType

// Criação de Usuários
UserService.createUser("john_doe", "john@example.com", "password123");
UserService.createUser("jane_doe", "jane@example.com", "password123");

// Busca de Usuários
const john = UserService.getUserByUsername("john_doe");
const jane = UserService.getUserByUsername("jane_doe");

// Criação de Tweets
if (john && jane) {
    TweetService.createTweet(john, "Hello world!", TweetType.Normal);
    TweetService.createTweet(jane, "Hi there!", TweetType.Normal);

    // Like no Tweet
    const tweets = TweetService.getTweets();
    if (tweets.length > 0) {
        TweetService.likeTweet(tweets[0].getId());
    }

    // Responder ao Tweet
    const tweet = TweetService.getTweets()[0];
    if (tweet) {
        TweetService.replyToTweet(tweet.getId(), jane, "Nice to see you here!");
    }

    // Exibir o Tweet com Likes e Replies
    TweetService.displayTweet(tweet.getId());
}
