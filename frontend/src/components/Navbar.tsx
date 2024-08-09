// import { Disclosure } from "@headlessui/react";
// import { Link } from "@tanstack/react-router";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import tripseekLogo from "../assets/tripseekFont.svg";

// <<<<<<< HEAD
// const navigation = [{ name: "Trip Generator", href: "/about", current: false }]
// =======
// const navigation = [{ name: "Trip Generator", href: "/about", current: false }];
// >>>>>>> 041e2a7853921405f89d663cd0169d1c577fbb25

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// const Navbar: React.FC = () => {
//   return (
//     <div className='top-0 '>
//       <Disclosure as='nav' className='bg-white w-[80%] mx-auto relative'>
//         {({ open }) => (
//           <>
//             <div className='mx-auto px-4 sm:px-6 lg:px-8'>
//               <div className='flex items-center h-16'>
//                 <div className='flex-1 flex items-center justify-start'>
//                   <Link to='/' className='flex-shrink-0'>
//                     <img
//                       src={tripseekLogo}
//                       alt='tripseek.ai'
//                       className='h-8 w-auto'
//                     />
//                   </Link>
//                   <div className='flex-1 flex justify-center'>
//                     <div className='hidden sm:flex sm:space-x-8 ml-4 justify-center'>
//                       {navigation.map((item) => (
//                         <Link
//                           key={item.name}
//                           to={item.href}
//                           className={classNames(
//                             item.current
//                               ? "text-gray-900"
//                               : "text-gray-700 hover:bg-gray-100 hover:text-gray-700",
//                             "px-3 py-2 rounded-md text-sm font-medium"
//                           )}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className='hidden sm:flex sm:items-center'>
//                   <button className='rounded-lg px-6 py-2 bg-zinc-900 text-white hover:opacity-90 transition-all duration-300 font-medium'>
//                     Sign In
//                   </button>
//                 </div>
//                 <div className='flex items-center sm:hidden'>
//                   <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
//                     <span className='sr-only'>Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
//                     ) : (
//                       <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//               </div>
// <<<<<<< HEAD
//             </div>

//             <Disclosure.Panel className='sm:hidden'>
//               <div className='px-2 pt-2 pb-3 space-y-1'>
//                 {navigation.map((item) => (
//                   <Disclosure.Button
//                     key={item.name}
//                     as={Link}
//                     to={item.href}
//                     className={classNames(
//                       item.current
//                         ? "bg-gray-100 text-gray-900"
//                         : "text-gray-700 hover:bg-gray-100",
//                       "block px-3 py-2 rounded-md text-base font-medium"
//                     )}
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//               <div className='px-2 pb-3'>
//                 <button className='w-full rounded-lg px-6 py-2 bg-zinc-900 text-white hover:opacity-90 transition-all duration-300 font-medium'>
//                   Sign In
//                 </button>
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>
//     </div>
//   )
// }
// =======
//               <div className='hidden sm:flex sm:items-center'>
//                 <button
//                   className='rounded-lg px-6 py-2 bg-zinc-900 text-white hover:opacity-90 transition-all duration-300 font-medium flex items-center'
//                   onClick={() => {
//                     console.log("Sign in clicked");
//                   }}
//                 >
//                   <img
//                     className='h-5 w-5 mr-2'
//                     src='https://img.icons8.com/color/48/google-logo.png'
//                     alt='Google'
//                   />
//                   Continue with Google
//                 </button>
//               </div>
//               <div className='flex items-center sm:hidden'>
//                 <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
//                   <span className='sr-only'>Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
//                   ) : (
//                     <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
//                   )}
//                 </Disclosure.Button>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className='sm:hidden'>
//             <div className='px-2 pt-2 pb-3 space-y-1'>
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as={Link}
//                   to={item.href}
//                   className={classNames(
//                     item.current
//                       ? "bg-gray-100 text-gray-900"
//                       : "text-gray-700 hover:bg-gray-100",
//                     "block px-3 py-2 rounded-md text-base font-medium"
//                   )}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//             <div className='px-2 pb-3'>
//               <button className='w-full rounded-lg px-6 py-2 bg-zinc-900 text-white hover:opacity-90 transition-all duration-300 font-medium'>
//                 Sign In
//               </button>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// };
// >>>>>>> 041e2a7853921405f89d663cd0169d1c577fbb25

// export default Navbar;
