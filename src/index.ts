import User, { UserService } from './model/User';
import Tweet, { TweetService } from './model/Tweet';
import {TweetType} from './types/TweetType';

UserService.createUser("PandoraVenusia", "Pandora@example.com", "password123");
UserService.createUser("NocturnaMorningStar", "Nocturna@example.com", "password123");

const Pandora = UserService.getUserByUsername("PandoraVenusia");
const Nocturna = UserService.getUserByUsername("NocturnaMorningStar");

if (Pandora && Nocturna) {
    TweetService.createTweet(Pandora, "Hello world!", TweetType.Normal);
    TweetService.createTweet(Nocturna, "Hi there!", TweetType.Normal);

    const tweets = TweetService.getTweets();
    if (tweets.length > 0) {
        TweetService.likeTweet(tweets[0].getId());
    }

    const tweet = TweetService.getTweets()[0];
    if (tweet) {
        TweetService.replyToTweet(tweet.getId(), Nocturna, "Nice to see you here!");
    }

    TweetService.displayTweet(tweet.getId());
}