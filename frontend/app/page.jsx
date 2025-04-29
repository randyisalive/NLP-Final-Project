"use client";
import useSummarizeData from "./hooks/useSummarizeData";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Home() {
  const { summary, handleForm, submitForm, form, isLoading, rouge } =
    useSummarizeData();
  return (
    <div class="container mx-auto py-10 flex flex-col gap-8">
      <div class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-center mb-6">Text Summarization</h1>
        <form onSubmit={(e) => submitForm(e)}>
          <div class="mb-4">
            <label
              for="inputText"
              class="block text-gray-700 text-sm font-medium mb-2"
            >
              Enter Your Text
            </label>
            <textarea
              id="inputText"
              name="input_text"
              value={form.input}
              rows="8"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Paste or type your text here..."
              required
              onChange={(e) => handleForm(e)}
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
          >
            Summarize
          </button>
        </form>
        <div className="py-3">
          {rouge.summarize ? (
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <tbody>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Rouge 1:</td>
                  <td className="p-2">{rouge.summarize?.rouge1}</td>
                </tr>
                <tr className="bg-white border-b border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Rouge 2:</td>
                  <td className="p-2">{rouge.summarize?.rouge2}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2 font-semibold text-gray-700">Rouge L:</td>
                  <td className="p-2">{rouge.summarize?.rougeL}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className=" flex justify-center items-center py-3">
              <ProgressSpinner />
            </div>
          )}
        </div>
      </div>

      <div className=" p-4 break-words   rounded-2xl text-sm justify-center flex ">
        {isLoading === 1 && <ProgressSpinner />}
        <p>{summary?.data?.summarize}</p>
      </div>
    </div>
  );
}
