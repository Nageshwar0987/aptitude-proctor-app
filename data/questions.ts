export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "A sum of money invested at compound interest amounts to $2400 in 2 years and $3000 in 3 years. What is the annual rate of interest?",
    options: ["15%", "20%", "25%", "30%"],
    correct: 2,
  },
  {
    id: 2,
    question: "If log₁₀(2) = 0.3010 and log₁₀(3) = 0.4771, find the value of log₁₀(24).",
    options: ["1.2552", "1.3802", "1.5051", "1.6532"],
    correct: 1,
  },
  {
    id: 3,
    question: "Find the missing term in the complex alphanumeric series: Z1A, X2D, V6G, T24J, ?",
    options: ["R120M", "R120N", "Q120M", "S100M"],
    correct: 0,
  },
  {
    id: 4,
    question: "A vessel contains 60 litres of milk. From this vessel, 12 litres of milk is taken out and replaced with water. This process is repeated twice more. What is the final amount of milk in the vessel?",
    options: ["30.72 litres", "32.40 litres", "28.50 litres", "34.56 litres"],
    correct: 0,
  },
  {
    id: 5,
    question: "In how many distinct ways can the letters of the word 'ALGORITHM' be arranged such that vowels always occupy the even positions?",
    options: ["2160", "4320", "8640", "17280"],
    correct: 1,
  },
  {
    id: 6,
    question: "A man rows a boat upstream at 8 km/h and downstream at 14 km/h. What is the speed of the current?",
    options: ["2 km/h", "3 km/h", "4 km/h", "5 km/h"],
    correct: 1,
  },
  {
    id: 7,
    question: "Find the remainder when 7⁹⁹ is divided by 25.",
    options: ["7", "12", "18", "24"],
    correct: 2,
  },
  {
    id: 8,
    question: "Two pipes A and B can fill a cistern in 12 minutes and 15 minutes respectively, while a third pipe C can empty it in 6 minutes. If A and B are opened for 5 minutes and then C is also opened, how long will the tank take to empty completely?",
    options: ["35 minutes", "40 minutes", "45 minutes", "50 minutes"],
    correct: 2,
  },
  {
    id: 9,
    question: "What is the angle between the hour hand and the minute hand of a clock at 4:20 PM?",
    options: ["0°", "5°", "10°", "12.5°"],
    correct: 2,
  },
  {
    id: 10,
    question: "The average weight of 30 students in a class is 45 kg. If the weight of the teacher is included, the average weight increases by 1 kg. What is the weight of the teacher?",
    options: ["72 kg", "75 kg", "76 kg", "80 kg"],
    correct: 2,
  },
  {
    id: 11,
    question: "A dealer marks his goods at 40% above the cost price and allows a discount of 25% on marked price. What is his net profit percentage?",
    options: ["2.5%", "5%", "7.5%", "10%"],
    correct: 1,
  },
  {
    id: 12,
    question: "If x + (1/x) = 5, find the value of x³ + (1/x³).",
    options: ["110", "125", "140", "115"],
    correct: 0,
  },
  {
    id: 13,
    question: "In a group of 60 people, 27 like cold drinks and 42 like hot drinks, and each person likes at least one of the two drinks. How many like both?",
    options: ["5", "7", "9", "11"],
    correct: 2,
  },
  {
    id: 14,
    question: "Find the next term in the logical number series: 5, 11, 24, 51, 106, ?",
    options: ["215", "217", "220", "225"],
    correct: 1,
  },
  {
    id: 15,
    question: "A contractor undertakes to complete a project in 90 days and employs 60 men. After 60 days, he finds that only 3/4th of the work has been completed. How many men can be discharged so that the project finishes on time?",
    options: ["10 men", "15 men", "20 men", "25 men"],
    correct: 2,
  },
  {
    id: 16,
    question: "The difference between simple and compound interest on a certain sum of money at 10% per annum for 2 years is $42. Find the principal amount.",
    options: ["$3500", "$4000", "$4200", "$4500"],
    correct: 2,
  },
  {
    id: 17,
    question: "A train 180 meters long is running at a speed of 72 km/h. How long will it take to cross a platform 220 meters long?",
    options: ["15 seconds", "18 seconds", "20 seconds", "22 seconds"],
    correct: 2,
  },
  {
    id: 18,
    question: "If South-East becomes North, North-East becomes West, and all other directions change in the same manner, what will West become?",
    options: ["North-East", "South-East", "North-West", "South-West"],
    correct: 1,
  },
  {
    id: 19,
    question: "What is the probability of drawing two consecutive aces from a well-shuffled pack of 52 playing cards without replacement?",
    options: ["1/221", "1/26", "2/51", "4/663"],
    correct: 0,
  },
  {
    id: 20,
    question: "The present ages of three persons are in the ratio 4 : 7 : 9. Eight years ago, the sum of their ages was 56. What is the present age of the eldest person?",
    options: ["27 years", "36 years", "45 years", "54 years"],
    correct: 1,
  },
  {
    id: 21,
    question: "Simplify: (0.05)³ + (0.07)³ - (0.12)³ / (0.05 × 0.07 × 0.36)",
    options: ["-1", "0", "1", "3"],
    correct: 0,
  },
  {
    id: 22,
    question: "A person sells two horses for $1,710 each. On one he gains 10% and on the other he loses 10%. What is his overall gain or loss percentage?",
    options: ["1% loss", "1% gain", "No profit no loss", "2% loss"],
    correct: 0,
  },
  {
    id: 23,
    question: "Find the LCM of the numbers: 2³.3².5, 2².3³.5², and 2⁴.3.5³.",
    options: ["5400", "7200", "10800", "21600"],
    correct: 3,
  },
  {
    id: 24,
    question: "If P means '+', Q means '-', R means '×', and S means '÷', then what is the value of: 44 R 4 S 11 Q 8 P 2?",
    options: ["8", "10", "12", "16"],
    correct: 1,
  },
  {
    id: 25,
    question: "Find the unit digit of the expression: (2467)¹⁵³ × (341)⁷².",
    options: ["1", "3", "7", "9"],
    correct: 2,
  }
];