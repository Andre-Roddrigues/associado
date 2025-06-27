"use client";

import { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import ReviewSubmit from "./steps/ReviewSubmit";
import { registerCursoInstrutor } from "../actionsFormador/actions";

interface ModalNovoCursoProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ModalNovoCurso({ onClose, onSubmit }: ModalNovoCursoProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const resetForm = () => {
    setFormData({});
    setStep(1);
  };

  const handleData = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    nextStep();
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await registerCursoInstrutor(formData);
      console.log("Curso criado com sucesso:", response);
      onSubmit(response);
      onClose();
    } catch (err) {
      console.error("Erro ao submeter curso:", err);
      alert("Erro ao registar o curso. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300">
      <div className="relative w-[90%] md:w-[80%] lg:w-[60%] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-5 md:p-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-2xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        <div className="mb-6">
          <div className="flex justify-between text-sm md:text-base font-medium">
            <span className={step === 1 ? "font-bold text-blue-600" : "text-muted-foreground"}>Curso</span>
            <span className={step === 2 ? "font-bold text-blue-600" : "text-muted-foreground"}>Instrutor</span>
            <span className={step === 3 ? "font-bold text-blue-600" : "text-muted-foreground"}>Revisão</span>
          </div>
          <div className="h-2 bg-gray-200 rounded mt-3">
            <div
              className="h-2 bg-blue-500 rounded transition-all duration-500"
              style={{ width: `${step * 33.33}%` }}
            />
          </div>
        </div>

        {step === 1 && <StepOne onNext={handleData} defaultValues={formData} />}
        {step === 2 && <StepTwo onNext={handleData} onBack={prevStep} defaultValues={formData} />}
        {step === 3 && (
          <ReviewSubmit data={formData} onBack={prevStep} onReset={resetForm} onSubmit={handleFinalSubmit} />
        )}
      </div>
    </div>
  );
}
