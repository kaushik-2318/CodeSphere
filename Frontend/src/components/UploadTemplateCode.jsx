import CodeEditor from './CodeEditor'
import FileUpload from './FileInput'

function UploadTemplateCode({ register, errors, framework, style, language, setLanguageCode, setStyleCode, setFrameworkCode }) {

  return (
    <>
      <div className='w-full grid grid-cols-2 gap-10'>

        <div>
          Write Your {framework} Code Here:-
          <CodeEditor options={framework} register={register} errors={errors} setCode={setFrameworkCode} />
        </div>

        {
          style !== '' ? (
            <div>
              Write Your {style} Code Here:-
              <CodeEditor options={style} register={register} errors={errors} setCode={setStyleCode} />
            </div>
          ) : (
            null
          )
        }

        {
          language !== '' ? (
            <div>
              Write Your {language} Code Here:-
              <CodeEditor options={language} register={register} errors={errors} setCode={setLanguageCode} />
            </div>
          ) : (
            null
          )
        }

        <div className='w-full mt-5'>
          <FileUpload />
        </div>
      </div>
    </>
  )
}

export default UploadTemplateCode
