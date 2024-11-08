import CodeEditor from "./CodeEditor";
import FileUpload from "./FileInput";

function UploadTemplateCode({ framework, style, language, setLanguageCode, setStyleCode, setFrameworkCode, setHasErrorsFramework, setHasErrorLanguage, setHasErrorsStyle }) {
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-10">
        <div>
          Write Your {framework} Code Here:-
          <CodeEditor options={framework} setCode={setFrameworkCode} setHasErrors={setHasErrorsFramework} />
        </div>

        {style !== "" ? (
          <div>
            Write Your {style} Code Here:-
            <CodeEditor options={style} setCode={setStyleCode} setHasErrors={setHasErrorsStyle} />
          </div>
        ) : null}

        {language !== "" ? (
          <div>
            Write Your {language} Code Here:-
            <CodeEditor options={language} setCode={setLanguageCode} setHasErrors={setHasErrorLanguage} />
          </div>
        ) : null}

        {/* TODO File Upload Component */}
        <div className="w-full mt-5">
          <FileUpload />
        </div>
      </div>
    </>
  );
}

export default UploadTemplateCode;
