"use client";

import { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Countercolor = "text-green-600" | "text-red-600" | "text-gray-800";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleDecrement = (): void => {
    setCount((prev) => prev - step);
  };

  const handleReset = (): void => {
    setCount(0);
  };

  const handleIncrement = (): void => {
    setCount((prev) => prev + step);
  };

  const handleStepCount = (e: ChangeEvent<HTMLInputElement>) => {
    const newStep = Number(e.target.value) || 1;
    setStep(newStep);
  };

  const getCounterColor = (): Countercolor => {
    if (count < 0) return "text-red-600";
    if (count > 0) return "text-green-600";
    return "text-gray-800";
  };

  const handleCopyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(count.toString());
      toast.success(`Copied "${count}" to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-8 pt-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">QA task counter</h1>
        <p className="text-xs text-center mb-1 text-gray-600">
          (pronounced KWA task counter)
        </p>
        <p className="text-xs text-center mb-4">
          <b>
            click number to copy to clipboard and paste it in this{' '}  
            <a className="text-blue-500"
              href="https://docs.google.com/spreadsheets/d/1BFhhQLBxkAL40Bp02gzN9GstfVwyaVR4EMkgmjrF4kg/edit?usp=sharing"
              target="_blank"
            >
              EXCEL
            </a>
          </b>
        </p>

        {/* Display Current Count */}
        <div
          onClick={handleCopyToClipboard}
          className={`text-6xl font-bold text-center mb-8 ${getCounterColor()} cursor-pointer hover:scale-105 transition-transform`}
        >
          {count}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleDecrement}
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition cursor-pointer"
          >
            - Decrement
          </button>

          <button
            onClick={handleReset}
            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition cursor-pointer"
          >
            Reset
          </button>

          <button
            onClick={handleIncrement}
            className="flex-1 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition cursor-pointer"
          >
            + Increment
          </button>
        </div>

        {/* Step Control */}
        {/* TYPESCRIPT NOTE: Input attributes like min, type are type-checked */}
        <div className="border-t pt-6">
          <label className="block text-sm font-medium mb-2">
            Step Value: {step}
          </label>
          <input
            type="number"
            value={step}
            onChange={handleStepCount}
            min="1"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Info Box - Accordion */}
        <div className="mt-6 bg-blue-50 rounded text-sm">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full p-4 text-left font-semibold flex justify-between items-center hover:bg-blue-100 transition-colors rounded"
          >
            <span className="cursor-pointer">
              Kwa hint list: (click to see hints)
            </span>
            <span className="text-lg cursor-pointer">
              {isAccordionOpen ? "−" : "+"}
            </span>
          </button>

          {isAccordionOpen && (
            <div className="px-4 pb-4">
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                <li>
                  click the counter number to copy it to clipboard so can paste
                  it into the excel sheet{" "}
                  <a
                    href="https://docs.google.com/spreadsheets/d/1BFhhQLBxkAL40Bp02gzN9GstfVwyaVR4EMkgmjrF4kg/edit?usp=sharing"
                    target="_blank"
                  >
                    <b>FOUND HERE</b>
                  </a>{" "}
                </li>
                <li>
                  if you accidentally reset, you can increase the step, to
                  increment back to that number
                </li>
                <li>
                  if you accidentally clicked too much, you could always
                  decrement back
                </li>
                <li>
                  step value controls how much is incremented / decremented
                </li>
                <li>
                  urban landscape, Trader Juice, patches of vegetation, rolling
                  hills stretching in the horizon, fawk-it (facade)
                </li>
                <li>happy tasking</li>
                <li>will add more features later</li>
              </ul>
            </div>
          )}
        </div>

        {/* Creator */}
        <div className="flex justify-end mt-1 rounded text-xs">
          <a href="https://coder-eta.vercel.app/" target="_blank">
            wandag
          </a>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
