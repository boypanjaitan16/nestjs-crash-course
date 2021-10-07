import { FeedPostEntity } from "src/feed/models/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: false})
    first_name:string;

    @Column({nullable: false})
    last_name:string;

    @Column({unique: true, nullable: false})
    email:string;

    @Column({ select: false, nullable: false })
    password:string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role

    @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
    feedPosts: FeedPostEntity[];
}