"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Tweet_1 = __importDefault(require("./Tweet"));
const TweetType_1 = __importDefault(require("../types/TweetType"));
class User {
    constructor(username, email, password) {
        this.id = User.idCounter++; // Atribui um ID único ao usuário e incrementa o contador estático
        this.username = username; // Inicializa o nome de usuário
        this.email = email; // Inicializa o email
        this.password = password; // Inicializa a senha
        this.followers = []; // Inicializa a lista de seguidores como vazia
        this.following = []; // Inicializa a lista de usuários que está seguindo como vazia
        this.tweets = []; // Inicializa a lista de tweets como vazia
    }
    follow(user) {
        if (user === this) { // Verifica se o usuário não está tentando seguir ele mesmo
            throw new Error("You cannot follow yourself."); // Lança uma exceção informando que não é possível seguir a si mesmo
        }
        if (!this.following.includes(user)) { // Verifica se o usuário já não está seguindo a pessoa
            this.following.push(user); // Adiciona o usuário à lista de quem está seguindo
            user.addFollower(this); // Adiciona este usuário à lista de seguidores do outro usuário
        }
    }
    addFollower(user) {
        this.followers.push(user); // Adiciona o usuário à lista de seguidores
    }
    unfollow(user) {
        const index = this.following.indexOf(user); // Encontra o índice do usuário na lista de quem está seguindo
        if (index !== -1) { // Verifica se o usuário está na lista de quem está seguindo
            this.following.splice(index, 1); // Remove o usuário da lista de quem está seguindo
            console.log(`${this.username} has unfollowed ${user.username}`); // Mensagem indicando que o usuário deixou de seguir outro
        }
        else {
            console.log(`${this.username} does not follow ${user.username}`); // Mensagem indicando que o usuário não estava seguindo o outro
        }
    }
    addTweet(tweet) {
        this.tweets.push(tweet); // Adiciona o tweet à lista de tweets do usuário
    }
    likeTweet(tweet) {
        tweet.like(); // Chama o método like do tweet
    }
    replyTweet(tweet, content) {
        const reply = new Tweet_1.default(this, content, TweetType_1.default.Reply); // Cria um novo tweet do tipo "reply"
        tweet.addReply(content); // Adiciona a resposta à lista de respostas do tweet original
    }
    getId() {
        return this.id;
    }
    getTweets() {
        return this.tweets;
    }
    getFollowing() {
        return this.following;
    }
}
User.idCounter = 0; // Contador estático para gerar IDs únicos para os usuários
exports.default = User;
class UserService {
    // Método estático para criar um novo usuário
    static createUser(username, email, password) {
        if (UserService.getUserByUsername(username)) { // Verifica se já existe um usuário com o mesmo nome de usuário
            throw new Error("Username already exists."); // Lança uma exceção informando que o nome de usuário já existe
        }
        const newUser = new User(username, email, password); // Cria um novo usuário
        UserService.users.push(newUser); // Adiciona o usuário à lista de usuários
        console.log(`User ${username} created.`); // Exibe uma mensagem indicando que o usuário foi criado com sucesso
    }
    // Método estático para obter a lista de usuários
    static getUsers() {
        return UserService.users; // Retorna a lista de usuários
    }
    // Método estático para obter um usuário pelo ID
    static getUserById(id) {
        return UserService.users.find(user => user.getId() === id); // Retorna o usuário com o ID especificado, se encontrado
    }
    // Método estático para obter um usuário pelo username
    static getUserByUsername(username) {
        return UserService.users.find(user => user.username === username); // Retorna o usuário com o username especificado, se encontrado
    }
    // Método estático para seguir um usuário
    static followUser(followerUsername, followingUsername) {
        const follower = UserService.getUserByUsername(followerUsername);
        const following = UserService.getUserByUsername(followingUsername);
        if (follower && following) {
            follower.follow(following);
            console.log(`${followerUsername} is now following ${followingUsername}`);
        }
        else {
            console.log("User not found.");
        }
    }
}
exports.UserService = UserService;
UserService.users = []; // Lista estática para armazenar os usuários
