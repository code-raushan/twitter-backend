import { TweetRepository } from "../repository/tweet.repository";
import { HashtagRepository } from "../repository/hashtag.repository";


export class TweetService{
    TweetRepository
    HashtagRepository
    constructor(){
        this.TweetRepository = new TweetRepository();
        this.HashtagRepository = new HashtagRepository();
    }
    async create(data:TweetData){
        const {content}= data;
        // getting all the hashtags from the tweet
        const tags = content.match(/#[a-zA-Z0-9_]+/g)?.map((tag)=>tag.substring(1).toLocaleLowerCase());

        // creating the tweet
        const tweet = await this.TweetRepository.create(data);
        
        // processing the hashtag
        let alreadyPresentTags = await this.HashtagRepository.findByName(tags as string[]);
        let titleOfPresentTags = alreadyPresentTags?.map(tag=>tag.title);

        let newTags = tags?.filter(tag=> !titleOfPresentTags?.includes(tag)) as string[];

        let newHashtags = newTags?.map(tag=>{
            return {title: tag, tweets: [tweet?.id]}
        }) as Hashtag[];

        if(newTags.length>0) await this.HashtagRepository.bulkCreate(newHashtags);
        
        alreadyPresentTags?.forEach((tag)=>{
            tag.tweets.push(tweet?.id);
            tag.save();
        });
        return tweet;
    }
}