import { QuizExperience } from "@/components/quiz/QuizExperience";
import { quizQuestions } from "@/data/questions";
import { quizGift } from "@/data/quizContent";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <QuizExperience questions={quizQuestions} gift={quizGift} />
    </main>
  );
}
