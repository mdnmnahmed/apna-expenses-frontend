import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FetchAPIData from '../../helpers/FetchAPIData';
import { addKhata } from '../../store/reducers/khataReducer';

const AddKhataForm = ({ setToggleBottomSheet }) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");


    const addKhataHandler = async (event) => {
        event.preventDefault();
        if (!title) {
            toast.error('Please Enter Expense & Amount');
            return;
        }

        let newKhataData = {
            title,
            message,
        }

        date && newKhataData.push(date);

        try {
            const response = await FetchAPIData('post', '/add-khata', newKhataData);
            console.log('response: ', response);
            setToggleBottomSheet(false);
            dispatch(addKhata(response.data.data));
        } catch (error) {
            console.log('Error in Adding Khata: ', error);
        }
    }

    return (
        <div class="flex">
            <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-4 flex flex-col md:ml-auto w-full z-10 shadow-md">
                <form onSubmit={addKhataHandler}>
                    <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Add Khata</h2>

                    <div class="mb-4">
                        <label for="title" class="leading-7 text-sm text-gray-600">Title</label>
                        <input type="text" id="title" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Mobile"
                        />
                    </div>

                    <div class="mb-4">
                        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                        <textarea id="message" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            placeholder="RealMe 7"
                        ></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="date" class="leading-7 text-sm text-gray-600">Date</label>
                        <input type="date" id="date" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            placeholder="23/02/2022"
                        />
                    </div>
                    <button class="w-full text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg" type="submit">
                        Add Khata
                    </button>
                    {/* loader ->
                     <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg> */}
                    {/* <p class="text-xs text-gray-500 mt-3">Some Txt.</p> */}
                </form>
            </div >
        </div >
    );
}

export default AddKhataForm;
