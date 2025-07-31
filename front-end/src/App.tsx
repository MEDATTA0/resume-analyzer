import "./App.css";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

function App() {
  const [jobs, setJobs] = useState("");
  const [response, setResponse] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUpload = async () => {
    const fileInput = fileRef.current;
    if (!fileInput || !fileInput.files || !fileInput.files.length) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("jobs", jobs);

    try {
      const { data } = await axios.post(
        "https://medatta0.tech/api/summarize-my-cv",
        formData
      );

      setLoading((prevValue) => !prevValue);
      console.log(data);
      setResponse(() => data.data.response);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError((prevValue) => !prevValue);
        setResponse(() => err.response?.data);
      } else console.log(err);
    }
  };

  return (
    <section className="flex w-screen h-screen bg-gradient-to-br from-blue-50 to-stone-400 py-4">
      <div className="w-[70%] mx-auto my-10 ">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
            setLoading((prevValue) => !prevValue);
          }}
          className="w-[80%] mx-auto flex flex-col gap-4 justify-center"
        >
          <input type="file" name="file" id="resume_file" ref={fileRef} />
          <input
            type="text"
            name="jobs"
            id="jobs_input"
            placeholder="Enter the aimed jobs (e.g., software developer, data scientist, nurse, pharmacist, etc.)"
            value={jobs}
            onChange={(e) => setJobs(() => e.target.value)}
            className="rounded-xl border p-2"
          />
          <button
            type="submit"
            className="w-40 mx-auto text-lg font-bold rounded-2xl border"
          >
            Review my CV
          </button>
        </form>

        {loading ? (
          <p className="m-12">Loading...</p>
        ) : (
          !error && (
            <div className="place-items-center my-4 text-xl">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {response}
              </ReactMarkdown>
            </div>
          )
        )}
        {error && <p className="text-red-500">{response}</p>}
      </div>
      <button className="w-20 h-10 mx-auto text-lg font-bold rounded-2xl border">
        Login
      </button>
    </section>
  );
}

export default App;
