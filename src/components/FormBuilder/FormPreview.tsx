interface FormField {
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface FormPreviewProps {
  schema: FormField[];
}

const FormPreview = ({ schema }: FormPreviewProps) => {
  const renderField = (field: FormField, index: number) => {
    const fieldId = `field-${index}`;

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            key={index}
            id={fieldId}
            type={field.type}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case "date":
        return (
          <input
            key={index}
            id={fieldId}
            type="date"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          />
        );

      case "select":
        return (
          <select
            key={index}
            id={fieldId}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          >
            <option value="">Choose an option</option>
            {field.options?.map((option: string, optIndex: number) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div key={index} className="flex items-center gap-3 py-2">
            <input
              id={fieldId}
              type="checkbox"
              className="w-5 h-5 accent-purple-600 cursor-pointer"
            />
            <label
              htmlFor={fieldId}
              className="text-sm text-gray-700 cursor-pointer select-none font-semibold"
            >
              {field.label}
            </label>
          </div>
        );

      case "file":
        return (
          <div key={index} className="relative">
            <input
              id={fieldId}
              type="file"
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
            <label
              htmlFor={fieldId}
              className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 cursor-pointer transition-all duration-200 gap-2 hover:border-purple-500 hover:bg-purple-50"
            >
              <span className="material-symbols-outlined text-2xl text-slate-400">
                cloud_upload
              </span>
              <span className="text-sm text-slate-600">
                Choose file or drag here
              </span>
            </label>
          </div>
        );

      default:
        return (
          <textarea
            key={index}
            id={fieldId}
            rows={4}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm resize-vertical transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {schema.map((field: FormField, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-2 animate-in fade-in duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {field.type !== "checkbox" && (
              <label
                htmlFor={`field-${index}`}
                className="text-sm font-semibold text-gray-700 flex items-center gap-1"
              >
                {field.label}
                {field.required && (
                  <span className="text-red-500 font-medium">*</span>
                )}
              </label>
            )}
            {renderField(field, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
