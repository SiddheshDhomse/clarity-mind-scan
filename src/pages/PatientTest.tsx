import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { TestCard } from "@/components/common/TestCard";
import { ProgressTracker } from "@/components/common/ProgressTracker";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mic, Volume2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const testSteps = [
  {
    id: "naming",
    title: "Naming Test",
    description: "Identify objects"
  },
  {
    id: "repetition",
    title: "Sentence Repetition",
    description: "Repeat phrases"
  },
  {
    id: "fluency",
    title: "Verbal Fluency",
    description: "Word generation"
  },
  {
    id: "memory",
    title: "Memory Recall",
    description: "Remember words"
  },
  {
    id: "abstraction",
    title: "Abstraction",
    description: "Abstract thinking"
  }
];

const testContent = {
  naming: {
    title: "Object Naming Test",
    instruction: "Look at the images below and say the name of each object. You can use the voice button to record your response or type your answer.",
    images: [
      { id: 1, name: "Apple", description: "A red fruit" },
      { id: 2, name: "Clock", description: "Shows time with hands" },
      { id: 3, name: "Bicycle", description: "Two-wheeled vehicle" }
    ]
  },
  repetition: {
    title: "Sentence Repetition",
    instruction: "Listen carefully to the sentence and repeat it exactly as you heard it. Click the play button to hear the sentence, then use the voice button to record your response.",
    sentences: [
      "The quick brown fox jumps over the lazy dog.",
      "She sells seashells by the seashore.",
      "The early bird catches the worm."
    ]
  },
  fluency: {
    title: "Verbal Fluency Test",
    instruction: "You have 60 seconds to name as many animals as you can. Click the voice button when you're ready to start. Speak clearly and try to name different animals.",
    timeLimit: 60
  },
  memory: {
    title: "Memory Recall Test",
    instruction: "Try to remember these three words. You will be asked to recall them later in the test.",
    words: ["APPLE", "SUNSHINE", "DOORWAY"]
  },
  abstraction: {
    title: "Abstraction Test",
    instruction: "Tell me how these two things are alike or what they have in common.",
    pairs: [
      { item1: "Orange", item2: "Banana" },
      { item1: "Train", item2: "Bicycle" }
    ]
  }
};

export default function PatientTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const currentTestId = testSteps[currentStep]?.id;
  const currentTest = testContent[currentTestId as keyof typeof testContent];

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Placeholder for actual voice recording logic
    setTimeout(() => {
      setIsRecording(false);
    }, 3000);
  };

  const handlePlayAudio = () => {
    // Placeholder for audio playback
    console.log("Playing audio instruction...");
  };

  const handleNext = () => {
    if (currentStep < testSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Test completed, navigate to results
      navigate("/test-results");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderTestContent = () => {
    switch (currentTestId) {
      case "naming":
        const namingTest = currentTest as typeof testContent.naming;
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {namingTest.images?.map((image, index) => (
              <div key={image.id} className="text-center space-y-3">
                <div className="bg-muted rounded-lg h-32 flex items-center justify-center text-muted-foreground">
                  <span className="text-lg">{image.description}</span>
                </div>
                <p className="text-body font-medium">Item {index + 1}</p>
              </div>
            ))}
          </div>
        );

      case "repetition":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Button variant="secondary" size="lg" onClick={handlePlayAudio}>
                <Volume2 className="mr-2" />
                Play Sentence
              </Button>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg text-center">
              <p className="text-body-large text-muted-foreground">
                Click play to hear the sentence, then record your response
              </p>
            </div>
          </div>
        );

      case "fluency":
        return (
          <div className="text-center space-y-6">
            <div className="bg-accent/10 p-8 rounded-lg">
              <div className="text-6xl font-bold text-accent mb-4">
                {isRecording ? "🎤" : "60"}
              </div>
              <p className="text-body-large text-foreground">
                {isRecording ? "Recording... Name animals!" : "Seconds to name animals"}
              </p>
            </div>
          </div>
        );

      case "memory":
        const memoryTest = currentTest as typeof testContent.memory;
        return (
          <div className="text-center space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {memoryTest.words?.map((word, index) => (
                <div key={index} className="bg-primary/10 p-6 rounded-lg">
                  <span className="text-2xl font-bold text-primary">{word}</span>
                </div>
              ))}
            </div>
            <p className="text-body text-muted-foreground">
              Take a moment to remember these words. You'll be asked about them later.
            </p>
          </div>
        );

      case "abstraction":
        const abstractionTest = currentTest as typeof testContent.abstraction;
        return (
          <div className="space-y-6">
            {abstractionTest.pairs?.map((pair, index) => (
              <div key={index} className="bg-muted/50 p-6 rounded-lg">
                <div className="flex items-center justify-center gap-6">
                  <span className="text-xl font-semibold bg-primary/10 px-4 py-2 rounded">
                    {pair.item1}
                  </span>
                  <span className="text-2xl text-muted-foreground">&</span>
                  <span className="text-xl font-semibold bg-primary/10 px-4 py-2 rounded">
                    {pair.item2}
                  </span>
                </div>
                <p className="text-center mt-4 text-muted-foreground">
                  How are these two things alike?
                </p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Tracker */}
        <ProgressTracker
          steps={testSteps}
          currentStep={currentStep}
          className="mb-8"
        />

        {/* Test Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <TestCard
            title={currentTest?.title || ""}
            instruction={currentTest?.instruction || ""}
            onVoiceInput={handleVoiceInput}
            onPlayAudio={handlePlayAudio}
            isRecording={isRecording}
            hasAudio={currentTestId === "repetition"}
          >
            {renderTestContent()}
          </TestCard>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-body text-muted-foreground">
              {currentStep + 1} of {testSteps.length}
            </span>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={handleNext}
          >
            {currentStep === testSteps.length - 1 ? "Complete Test" : "Next"}
            <ArrowRight className="ml-2" />
          </Button>
        </div>

        {/* Exit option */}
        <div className="text-center mt-8">
          <Button variant="ghost" asChild>
            <Link to="/">Exit Test</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}