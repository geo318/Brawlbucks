import { useEmailForm } from "@src/hooks/useEmailForm";

export const EmailForm = () => {
  const { props, formData, message, isLoading, handleSubmit, getInfo } =
    useEmailForm();
  return (
    <>
      {message.error && (
        <p className="text-red-500 border border-red-300 rounded-md p-3">
          ⚠️ {message.error}
        </p>
      )}
      {message.success && (
        <p className="text-green-500 font-bold border border-green-300 rounded-md p-3 mt-5">
          ✅ {message.success}
        </p>
      )}
      <form
        method="post"
        className="grid grid-cols-2 gap-6 mt-8"
        onSubmit={handleSubmit}
      >
        {(Object.entries(formData) as [keyof typeof formData, string][]).map(
          ([key, _]) => (
            <div
              key={key}
              className={`flex flex-col gap-2 ${
                getInfo(key).required ? "lg:col-span-1 col-span-2" : "col-span-2"
              }`}
            >
              <label className="capitalize font-bold text-sm">
                {key}
                {getInfo(key).required ? "*" : ""}:
              </label>
              {key !== "message" ? (
                <input
                  {...props(key)}
                  className="p-3 border border-gray-900 rounded-lg focus:outline-[#FF0D0D]"
                />
              ) : (
                <textarea
                  {...props(key)}
                  className="border border-gray-900 rounded-lg p-3 focus:outline-[#FF0D0D]"
                  rows={5}
                />
              )}
            </div>
          ),
        )}

        <button
          type="submit"
          className="lg:text-white lg:bg-[#FF0D0D] text-black bg-white lg:hover:bg-[#cf3d3d] hover:bg-slate-200 py-3 text-sm font-bold rounded-lg col-span-2 disabled:opacity-50 disabled:cursor-default"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EmailForm;
