import { User } from 'src/infra/data-services/mysql/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'shortened_urls'
})
export class ShortenedUrls {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  originalUrl: string

  @Column()
  shortCode: string

  @Column()
  clickCount: number

  @Column({
    nullable: true
  })
  createdBy: string

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date

  @Column({
    nullable: true
  })
  deletedAt?: Date

  // Relationships
  @ManyToOne(() => User, (user) => user.shortenedUrls, {})
  @JoinColumn({ name: 'createdBy' })
  user: User
}
