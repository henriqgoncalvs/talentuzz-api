import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin_test1@admin.com' },
    update: {},
    create: {
      email: 'test_1@admin.com',
      password: await argon.hash('password'),
      organization: {
        create: {
          name: 'Test Org 1',
          email: 'org1@test.com',
          phone: '944-528-1711',
          info: 'Totam alias fuga enim esse ullam sit. Nisi animi ut at voluptatem odit nam ea. Et fuga consequatur similique asperiores non suscipit corrupti aperiam. Molestiae quae aut laborum soluta blanditiis cupiditate hic nobis provident.Et quae aut labore aut rerum. Nisi at autem. Enim ipsum enim consectetur sequi consequatur. Sint qui qui quam. Voluptas dignissimos rem et natus. Autem et mollitia hic suscipit illum placeat.Optio aut sit assumenda quo eius omnis sed non consequatur. Numquam perferendis ea sit rerum officia cupiditate aut itaque doloremque. Itaque alias est repellendus. Esse consectetur tenetur velit autem excepturi. Velit perspiciatis saepe dolorum fugiat. Adipisci odio porro quibusdam similique sunt temporibus ipsam.Dolor assumenda aut qui et in perferendis et. Possimus quam qui impedit. Nesciunt aliquid qui consequatur possimus eos velit deserunt magni qui. Nam accusantium libero corrupti.Nulla in ut sunt rerum voluptatem rerum voluptates. Quis expedita natus earum similique officiis rem. Possimus similique architecto ut ad ea quia laborum. Officia voluptatibus quos aliquid delectus. Est voluptates necessitatibus iure et provident iusto at voluptatem sit. Molestiae exercitationem repellat tempore. Id excepturi officiis iste ullam similique et hic sit. Quis et eaque quidem. Qui voluptas ea et rem recusandae suscipit voluptatem sit. Sint ut officiis nihil perferendis nihil quibusdam molestiae. Blanditiis nihil ab illo. Voluptatem mollitia officia aperiam. Esse voluptatum voluptatem nihil minima. Placeat itaque aut numquam. Quis nobis commodi voluptatum ipsum perspiciatis aut. Omnis nulla enim natus architecto in. Autem ab aperiam vitae ipsa quia. Adipisci deleniti voluptas ea nam nesciunt. Doloribus delectus modi et. Voluptatem qui sit eaque qui totam. In facilis excepturi et quae et ullam maiores et sit. Enim consequatur dolorem dolorem eum ullam rerum cum similique odit. Aut velit rem est id et tenetur ut. Velit sunt et velit odit qui mollitia aut harum aut. Cupiditate doloribus dicta reprehenderit aliquid consequatur eum voluptas veritatis. Ut corporis sed et magni consequatur voluptatem.',
          profileImage: 'https://picsum.photos/200/200',
          location: 'London - England',
          jobs: {
            create: {
              position: 'Product Manager',
              info: 'Sequi accusantium repellat ea eius nulla consectetur sit. Quia et dolorem consequatur dolores quae. Et accusamus incidunt hic. Est dolores odio autem molestiae dicta minus laborum. Quia et nobis non officia. Itaque ipsam enim libero dolor aut est quas. Dolor nemo impedit quod illum. Ea tempora aut. Commodi nulla ut corporis. Est ipsum nulla expedita labore ut commodi. Fuga non quam sint fuga. Temporibus accusamus maiores. Ut cupiditate distinctio. Ratione iure quis saepe officia fugit autem. Alias voluptatem accusantium doloribus est et est sunt. Laboriosam ut aspernatur omnis doloremque ducimus eveniet incidunt eius. Quo cumque quas sit et. Non porro placeat nobis perferendis. Assumenda voluptas tempora eum quia aut voluptatem. Similique facere ullam saepe unde totam vel nihil velit. Tempora fuga sint praesentium. Est nihil asperiores sed perferendis id magni. Voluptatem deserunt sint. Consectetur velit qui et atque ea quis. Omnis omnis qui et est. Rerum dignissimos asperiores. Aut rem voluptatem dolor. Animi iure provident in et et voluptatem cumque itaque. Enim ipsum aspernatur autem fugit beatae et. Alias ut nostrum expedita vel et perferendis. Error aliquam distinctio fugiat voluptatem numquam dolorum. Omnis quam consequatur occaecati aliquam. Nesciunt doloremque atque fugit voluptates omnis praesentium. Provident aliquam ex delectus. Corporis ut omnis. Rerum adipisci cum dolor deserunt. Quo voluptatum quae dolor voluptates. Nam placeat optio ex sed inventore nihil labore. Optio aliquam ratione non. Facere dolor illum.',
              location: 'London',
              department: 'Product',
              employmentType: 'full-time',
              experienceLevel: 'mid-level',
              salaryRange: '30-to-50',
            },
          },
        },
      },
    },
  });

  console.log({ user });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
