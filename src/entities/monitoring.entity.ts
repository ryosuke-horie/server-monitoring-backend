import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Monitoring {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  target_name: string; // 監視対象サーバー名

  @Column()
  target_ip: string; // 監視対象サーバーIP

  @Column()
  is_backup_completed: boolean; // バックアップ完了フラグ

  @Column()
  is_not_alert: boolean; // アラート通知フラグ

  @Column()
  is_working: boolean; // 監視対象サーバー稼働フラグ

  @Column()
  created_at: Date; // 作成日時

  @Column()
  updated_at: Date; // 更新日時

  @ManyToOne(() => User, (user) => user.monitorings)
  user: User;

  @Column()
  userId: number; // ユーザーID
}
