import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = ({ renderPage, setRenderPage }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://ai-image-generator-dq4s.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://ai-image-generator-dq4s.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
        setRenderPage(!renderPage);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Generate Image</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image by a set descriptions....
        </p>
      </div>

      <form className="mt-16" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-full lg:col-span-1">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="Ex., john doe"
                value={form.name}
                handleChange={handleChange}
              />
              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                handleChange={handleChange}
              />
            </div>

            <div className="mt-5 flex gap-5">
              <button
                type="button"
                onClick={generateImage}
                className=" text-white bg-green-700 transition-all hover:bg-green-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
              <button
                type="button"
                onClick={handleSurpriseMe}
                className=" text-gray-900 bg-gray-200 transition-all hover:bg-gray-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Suggest Me
              </button>
            </div>
            <div className="lg:hidden relative mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 overflow-hidden focus:border-blue-500 flex w-2/3 justify-center items-center">
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} className=" object-contain" />
              ) : (
                <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
            {!!form?.photo && (
              <div className="mt-10">
                <p className="mt-2 text-[#666e75] text-[14px]">
                  ** Once you have created the image you want, you can share it with others in the community **
                </p>
                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    {loading ? 'Sharing...' : 'Share with the Community'}
                  </button>

                  <a
                    download="download.jpg"
                    href={form.photo}
                    className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >'
                  >
                    Download
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 overflow-hidden focus:border-blue-500 flex w-2/3 justify-center items-center">
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} className=" object-contain" />
              ) : (
                <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
