import { MigrationInterface, QueryRunner } from 'typeorm'

export class ShortenedUrls1705625355285 implements MigrationInterface {
  name = 'ShortenedUrls1705625355285'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`shortened_urls\` (\`id\` varchar(36) NOT NULL, \`originalUrl\` varchar(255) NOT NULL, \`shortCode\` varchar(255) NOT NULL, \`clickCount\` int NOT NULL, \`createdBy\` varchar(255) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `ALTER TABLE \`shortened_urls\` ADD CONSTRAINT \`FK_caafd65c6ff7340b0e741126b54\` FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`shortened_urls\` DROP FOREIGN KEY \`FK_caafd65c6ff7340b0e741126b54\``)
    await queryRunner.query(`DROP TABLE \`shortened_urls\``)
  }
}
