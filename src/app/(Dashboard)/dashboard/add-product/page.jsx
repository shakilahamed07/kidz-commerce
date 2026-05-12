"use client";
import { addProduct } from "@/action/server/products";
import React, { useState } from "react";
import { HiOutlineCloudUpload, HiOutlinePlus, HiOutlineTrash, HiOutlineInformationCircle } from "react-icons/hi";
import { MdPublish } from "react-icons/md";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    bangla: "",
    image: "",
    price: "",
    discount: 0,
    sizes: [],
    color: [],
    description: "",
    reviews: 0,
    sold: 0,
    ratings: 0,
    info: [""], 
    qna: [{ question: "", answer: "" }],
  });

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Info Array Handlers ---
  const handleInfoChange = (index, value) => {
    const updatedInfo = [...formData.info];
    updatedInfo[index] = value;
    setFormData({ ...formData, info: updatedInfo });
  };

  const addInfoField = () => setFormData({ ...formData, info: [...formData.info, ""] });
  const removeInfoField = (index) => {
    const updatedInfo = formData.info.filter((_, i) => i !== index);
    setFormData({ ...formData, info: updatedInfo });
  };

  // --- QnA Array Handlers ---
  const handleQnAChange = (index, field, value) => {
    const updatedQnA = [...formData.qna];
    updatedQnA[index][field] = value;
    setFormData({ ...formData, qna: updatedQnA });
  };

  const addQnAField = () => setFormData({ ...formData, qna: [...formData.qna, { question: "", answer: "" }] });
  const removeQnAField = (index) => {
    const updatedQnA = formData.qna.filter((_, i) => i !== index);
    setFormData({ ...formData, qna: updatedQnA });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Product Data:", formData);
    const res = await addProduct(formData);
    if (res.success) {
      Swal.fire("success", "Product added successfully!", "success");
      e.target.reset(); // Reset form after successful submission
      setFormData({
        title: "",
        bangla: "",
        image: "",
        price: "",
        discount: 0,
        sizes: [],
        color: [],
        description: "",
        reviews: 0,
        sold: 0,
        ratings: 0,
        info: [""],
        qna: [{ question: "", answer: "" }]
      });
    } else {
      Swal.fire("error", "Failed to add product. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 md:mr-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Add New Product</h1>
          <p className="text-sm text-gray-500 font-medium">Create a new entry for Kidz Commerce inventory</p>
        </div>
        <button type="submit" form="product-form" className="btn btn-primary px-6 shadow-lg shadow-primary/20">
          <MdPublish size={25} /> Publish Product
        </button>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information Card */}
          <div className="card bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
            <h3 className="text-sm font-black text-gray-400 uppercase mb-5 flex items-center gap-2">
              <HiOutlineInformationCircle size={18}/> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label font-bold text-xs">Product Title (English)</label>
                <input type="text" name="title" onChange={handleChange} placeholder="e.g. Superman Costume" className="input input-bordered focus:border-primary w-full bg-gray-50/50" required />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold text-xs">Product Title (Bangla)</label>
                <input type="text" name="bangla" onChange={handleChange} placeholder="শিশুদের পোশাক" className="input input-bordered w-full bg-gray-50/50" />
              </div>
              <div className="form-control w-full md:col-span-2">
                <label className="label font-bold text-xs">Description</label>
                <textarea name="description" onChange={handleChange} rows="5" className="textarea textarea-bordered w-full bg-gray-50/50 leading-relaxed" placeholder="Tell more about the product..."></textarea>
              </div>
            </div>
          </div>

          {/* Info Features (Array) */}
          <div className="card bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-black text-gray-400 uppercase">Key Highlights (Info)</h3>
              <button type="button" onClick={addInfoField} className="btn btn-xs btn-ghost text-primary font-black">+ Add Line</button>
            </div>
            <div className="space-y-3">
              {formData.info.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => handleInfoChange(index, e.target.value)} placeholder={`Highlight ${index+1}`} className="input input-bordered input-sm w-full bg-gray-50/50" />
                  <button type="button" onClick={() => removeInfoField(index)} className="btn btn-sm btn-square btn-ghost text-error"><HiOutlineTrash/></button>
                </div>
              ))}
            </div>
          </div>

          {/* QnA Section */}
          <div className="card bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-black text-gray-400 uppercase">Product Q&A</h3>
              <button type="button" onClick={addQnAField} className="btn btn-xs btn-ghost text-primary font-black">+ Add QnA</button>
            </div>
            <div className="space-y-6">
              {formData.qna.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100 relative">
                   <button type="button" onClick={() => removeQnAField(index)} className="absolute top-2 right-2 text-error"><HiX/></button>
                   <input type="text" placeholder="Question" value={item.question} onChange={(e) => handleQnAChange(index, "question", e.target.value)} className="input input-sm input-bordered w-full font-bold" />
                   <textarea placeholder="Answer" value={item.answer} onChange={(e) => handleQnAChange(index, "answer", e.target.value)} className="textarea textarea-sm textarea-bordered w-full"></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Media */}
        <div className="space-y-6">
          
          {/* Media Card */}
          <div className="card bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
            <h3 className="text-sm font-black text-gray-400 uppercase mb-5">Product Media</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer group">
              <div className="flex flex-col items-center gap-2">
                <HiOutlineCloudUpload size={40} className="text-gray-300 group-hover:text-primary transition-colors" />
                <p className="text-xs font-bold text-gray-500">Upload Image URL</p>
              </div>
            </div>
            <input type="text" name="image" onChange={handleChange} placeholder="https://image-url.com" className="input input-sm input-bordered w-full mt-4 bg-gray-50/50" />
          </div>

          {/* Pricing Card */}
          <div className="card bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
            <h3 className="text-sm font-black text-gray-400 uppercase mb-5">Pricing & Stats</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label font-bold text-xs">Base Price (৳)</label>
                <input type="number" name="price" onChange={handleChange} className="input input-bordered w-full font-black text-lg" placeholder="0.00" />
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs">Discount (%)</label>
                <input type="number" name="discount" onChange={handleChange} className="input input-bordered w-full" placeholder="10" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label font-bold text-[10px]">Ratings (Initial)</label>
                  <input type="number" step="0.1" name="ratings" onChange={handleChange} className="input input-bordered w-full input-sm" placeholder="4.5" />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-[10px]">Sold Count</label>
                  <input type="number" name="sold" onChange={handleChange} className="input input-bordered w-full input-sm" placeholder="32" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

function HiX() {
    return <HiOutlineTrash size={16}/>;
}