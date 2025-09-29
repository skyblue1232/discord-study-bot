import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import cron from "node-cron";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TEAMS = [
  { id: "1417077780083900487", name: "올망졸망 그로스해킹", day: "monday" },
  { id: "1417075201732116592", name: "나홀로 도장깨기", day: "tuesday" },
  { id: "1417075464345882677", name: "하츠네 도쿠", day: "tuesday" },
  { id: "1417076587106668565", name: "웹등이 공부법", day: "friday" },
  { id: "1417076780535250994", name: "풀싹이들", day: "monday" },
  { id: "1417076895857643520", name: "테일러 Swift", day: "thursday" },
  { id: "1417077978734788609", name: "MCP 서버 구축하기", day: "monday" },
  { id: "1417078099367170129", name: "A to Z, 논문까지 찍어보자", day: "thursday" },
  { id: "1417079046415581215", name: "CSS", day: "monday" },
  { id: "1417079494405132431", name: "코드 브레이커 화요일팀", day: "tuesday" },
  { id: "1417079494405132431", name: "코드 브레이커 목요일팀", day: "thursday" },
  { id: "1418246695463948468", name: "코테모태 A팀", day: "thursday" },
  { id: "1418246751109779612", name: "코테모태 B팀", day: "thursday" },
  { id: "1417079966352539671", name: "유기하지마!!!", day: "thursday" },
  { id: "1418104719813115934", name: "공모전이 처음이라 괜찮아 히어로즈팀", day: "monday" },
  { id: "1418104904710623302", name: "공모전이 처음이라 괜찮아 일링삼팀", day: "friday" },
  { id: "1418104993285935124", name: "공모전이 처음이라 괜찮아 C팀", day: "thursday" },
];

const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  cron.schedule(
    "55 9 * * *",
    async () => {
      console.log("⏰ 알림 실행됨");

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const targetDay = weekdays[tomorrow.getDay()]; 

      for (const team of TEAMS) {
        if (team.day === targetDay) {
          const channel = await client.channels.fetch(team.id);
          if (channel && channel.isTextBased()) {
            await channel.send(
                `📢 [${team.name}] 스터디 과제 & 피드백 안내
              내일 스터디 전까지 과제를 제출해주시고,
              피드백은 스터디 당일 자정까지 작성해주시기 바랍니다 😊
              모두 힘내서 함께 멋진 스터디 만들어가요 🔥`
              );
            console.log(`📨 알림 전송: ${team.name}`);
          }
        }
      }
    },
    { timezone: "Asia/Seoul" }
  );
});

client.login(process.env.DISCORD_TOKEN);
