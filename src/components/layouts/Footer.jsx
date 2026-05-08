"use client";
import React from "react";
import Logo from "../logo";
import { usePathname } from "next/navigation";

export default function Footer() {
  
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className=" bg-neutral  text-neutral-content ">
      <div className="footer sm:footer-horizontal p-10 max-w-400 mx-auto mt-10 rounded-lg">
        <aside>
          <Logo />
          <p>
            Tory Industries Ltd.
            <br />
            Providing reliable tech since 2015
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </div>
  );
}
