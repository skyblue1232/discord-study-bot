// import { Client, GatewayIntentBits } from "discord.js";
// import cron from "node-cron";

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//   ],
// });

// // 팀별 스레드 ID + 마감 요일 (0=일, 1=월, ... 6=토)
// const TEAMS = [
//   { id: "1410850849772667001", name: "팀 1", dueDay: 1 }, // 월요일 마감
//   { id: "1410850849772667002", name: "팀 2", dueDay: 2 }, // 화요일 마감
//   { id: "1410850849772667003", name: "팀 3", dueDay: 3 }, // 수요일 마감
//   { id: "1410850849772667004", name: "팀 4", dueDay: 4 }, // 목요일 마감
//   { id: "1410850849772667005", name: "팀 5", dueDay: 5 }, // 금요일 마감
//   { id: "1410850849772667006", name: "팀 6", dueDay: 6 }, // 토요일 마감
//   { id: "1410850849772667007", name: "팀 7", dueDay: 0 }, // 일요일 마감
//   { id: "1410850849772667008", name: "팀 8", dueDay: 1 },
//   { id: "1410850849772667009", name: "팀 9", dueDay: 2 },
//   { id: "1410850849772667010", name: "팀 10", dueDay: 3 },
//   { id: "1410850849772667011", name: "팀 11", dueDay: 4 },
//   { id: "1410850849772667012", name: "팀 12", dueDay: 5 },
//   { id: "1410850849772667013", name: "팀 13", dueDay: 6 },
//   { id: "1410850849772667014", name: "팀 14", dueDay: 0 },
//   { id: "1410850849772667015", name: "팀 15", dueDay: 1 },
//   { id: "1410850849772667016", name: "팀 16", dueDay: 2 },
//   { id: "1410850849772667017", name: "팀 17", dueDay: 3 },
//   { id: "1410850849772667018", name: "팀 18", dueDay: 4 },
//   { id: "1410850849772667019", name: "팀 19", dueDay: 5 },
//   { id: "1410850849772667020", name: "팀 20", dueDay: 6 },
// ];

// client.once("ready", () => {
//   console.log(`Logged in as ${client.user.tag}`);

//   TEAMS.forEach((team) => {
//     // 하루 전 알림 (저녁 20시)
//     const reminderDay = (team.dueDay + 6) % 7;
//     cron.schedule(`0 20 * * ${reminderDay}`, async () => {
//       const thread = await client.channels.fetch(team.id);
//       if (thread && thread.isThread()) {
//         await thread.send(
//           `📢 ${team.name} 스터디 과제 제출까지 하루 남았습니다!\n아직 제출하지 못한 멤버분들은 내일까지 꼭 제출 부탁드려요 😊`
//         );
//       }
//     });

//     // 당일 알림 (오전 10시)
//     cron.schedule(`0 10 * * ${team.dueDay}`, async () => {
//       const thread = await client.channels.fetch(team.id);
//       if (thread && thread.isThread()) {
//         await thread.send(
//           `📢 ${team.name} 스터디 마감 알림입니다!\n\n오늘은 스터디 과제 마감일이에요✍️\n모든 멤버분들이 제출을 완료해야 스터디가 원활하게 진행됩니다.\n아직 제출하지 않은 멤버분들은 오늘 안에 꼭 제출 부탁드립니다!\n\n꾸준히 나만의 T를 기록해보아요💪`
//         );
//       }
//     });
//   });
// });

// client.login("MTQxMDg1MTgzOTU2NTYyNzQwMg.Gj2DN3.XKzQ7ljBHUUlTlAoUQO1iAftuuBru4h-qGBuis");


import { Client, GatewayIntentBits } from "discord.js";
import cron from "node-cron";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TEAMS = [
  { id: "1410850849772667003", name: "팀 3" },
];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  cron.schedule("47 14 * * *", async () => {
    for (const team of TEAMS) {
      const thread = await client.channels.fetch(team.id);
      if (thread && thread.isThread()) {
        await thread.send(
          `[테스트 알림] ${team.name} 스터디 알림봇이 정상적으로 작동합니다! (지금은 오후 2시 47분)`
        );
      }
    }
  });
});

client.login("MTQxMDg1MTgzOTU2NTYyNzQwMg.Gj2DN3.XKzQ7ljBHUUlTlAoUQO1iAftuuBru4h-qGBuis");

