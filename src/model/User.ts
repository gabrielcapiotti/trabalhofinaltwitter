import Tweet from './Tweet';
import TweetType from '../types/TweetType'; 

export default class User {
    private static idCounter = 0; // Contador estático para gerar IDs únicos para os usuários
    private id: number; // ID único do usuário
    public username: string; // Nome de usuário público
    private email: string; // Email privado do usuário
    private password: string; // Senha privada do usuário
    public followers: User[]; // Lista pública de seguidores, contendo objetos do tipo User
    public following: User[]; // Lista de usuários que este usuário está seguindo
    private tweets: Tweet[]; // Lista de tweets do usuário

    constructor(
        username: string,
        email: string,
        password: string,
    ) {
        this.id = User.idCounter++; // Atribui um ID único ao usuário e incrementa o contador estático
        this.username = username; // Inicializa o nome de usuário
        this.email = email; // Inicializa o email
        this.password = password; // Inicializa a senha
        this.followers = []; // Inicializa a lista de seguidores como vazia
        this.following = []; // Inicializa a lista de usuários que está seguindo como vazia
        this.tweets = []; // Inicializa a lista de tweets como vazia
    }

    follow(user: User) {
        if (user === this) { // Verifica se usuário não está tentando seguir ele mesmo
            throw new Error("You cannot follow yourself."); // Lança uma exceção informando que não é possível seguir a si mesmo
        }

        if (!this.following.includes(user)) { // Verifica se o usuário já não está seguindo a pessoa
            this.following.push(user); // Adiciona o usuário à lista de quem está seguindo
            user.addFollower(this); // Adiciona este usuário à lista de seguidores do outro usuário
        }
    }

    addFollower(user: User) {
        this.followers.push(user); // Adiciona o usuário à lista de seguidores
    }

    unfollow(user: User) {
        const index = this.following.indexOf(user); // Encontra o índice do usuário na lista de quem está seguindo

        if (index !== -1) { // Verifica se usuário está na lista de quem está seguindo
            this.following.splice(index, 1); // Remove o usuário da lista de quem está seguindo
            console.log(`${this.username} has unfollowed ${user.username}`); // indica que usuário deixou de seguir outro
        } else {
            console.log(`${this.username} does not follow ${user.username}`); // indica que usuário não está seguindo o outro
        }
    }

    addTweet(tweet: Tweet) {
        this.tweets.push(tweet); // Adiciona tweet à lista de tweets do usuário
    }

    likeTweet(tweet: Tweet) {
        tweet.like(); // Chama método like do tweet
    }
    
    replyTweet(tweet: Tweet, content: string) {
        const reply = new Tweet(this, content, TweetType.Reply); // Cria novo tweet do tipo "reply"
        tweet.addReply(content); // Adiciona a resposta à lista de respostas do tweet original
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
    private static users: User[] = []; // Lista estática para armazenar os usuários

    // Método estático para criar um novo usuário
    static createUser(username: string, email: string, password: string) {
        if (UserService.getUserByUsername(username)) { // Verifica se já existe um usuário com o mesmo nome de usuário
            throw new Error("Username already exists."); // Lança uma exceção informando que o nome de usuário já existe
        }
        const newUser = new User(username, email, password); // Cria um novo usuário
        UserService.users.push(newUser); // Adiciona o usuário à lista de usuários
        console.log(`User ${username} created.`); // Exibe uma mensagem indicando que o usuário foi criado com sucesso
    }

    // Método estático para obter a lista de usuários
    static getUsers(): User[] {
        return UserService.users; // Retorna a lista de usuários
    }

    // Método estático para obter um usuário pelo ID
    static getUserById(id: number): User | undefined {
        return UserService.users.find(user => user.getId() === id); // Retorna o usuário com o ID especificado, se encontrado
    }

    // Método estático para obter um usuário pelo username
    static getUserByUsername(username: string): User | undefined {
        return UserService.users.find(user => user.username === username); // Retorna o usuário com o username especificado, se encontrado
    }

    // Método estático para seguir um usuário
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

