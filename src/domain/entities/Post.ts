import { User } from "./User";
import {v4 as uuidv4} from 'uuid';

export class Post {
    private id: string;
    private title: string;
    private text: string;
    private owner: string;
    private likes: number;
    private dislikes: number;

    constructor(title: string, text: string, owner: string ,likes?: number , dislikes?:number, id?: string ) {
        this.id = uuidv4();
        this.title = title;
        this.text = text;
        this.owner = owner;
        this.likes = 0;
        this.dislikes = 0;
    }


    public _id(): string {
        return this.id;
    }

    public _title(): string {
        return this.title;
    }

    public _text(): string {
        return this.text;
    }

    public _owner(): string {
        return this.owner;
    }

    public _likes(): number {
        return this.likes;
    }

    public _dislikes(): number {
        return this.dislikes;
    }

}

