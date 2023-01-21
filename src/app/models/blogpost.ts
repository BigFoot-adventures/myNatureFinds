export class Blogpost {
    postId:number=0;
    createdDate:string=""; // toJSON?
    title: string="";
    content:string="";
    userId:string="";
    headerImage:string="";
    lastUpdated:string=""; // toJSON?

    /*constructor(postId?:number,createdDate:string="",title:string="",content:string="", userId:string, headerImage:string="", lastUpdated:string="")
    {
        this.postId=postId;
        this.createdDate=createdDate;
        this.title=title;
        this.content=content;
        this.userId=userId;
        this.headerImage=headerImage;
        this.lastUpdated=lastUpdated;
    }*/
}
