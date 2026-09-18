// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import {
//   ArrowRight,
//   ArrowUpRight,
//   BrainCircuit,
//   Database,
//   Cpu,
//   Leaf,
//   Users,
//   FlaskConical,
//   Presentation,
//   Lightbulb,
//   Sparkles,
//   CalendarDays,
//   MapPin,
//   Wifi,
//   FileText,
//   IndianRupee,
//   Check,
//   BookOpen,
//   Microscope,
//   ChevronRight,
//   Target,
//   Layers3,
// } from 'lucide-react'

// const fade = {
//   hidden: {
//     opacity: 0,
//     y: 24,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// }

// const aboutPoints = [
//   {
//     icon: Target,
//     title: 'Explore real-world problems',
//     text: 'Identify meaningful challenges and approach them through research, experimentation and evidence.',
//   },
//   {
//     icon: Lightbulb,
//     title: 'Build original ideas',
//     text: 'Turn your curiosity into a structured idea, prototype, study or research-driven solution.',
//   },
//   {
//     icon: Users,
//     title: 'Connect disciplines',
//     text: 'Bring perspectives from technology, science, sustainability and other fields together.',
//   },
//   {
//     icon: Presentation,
//     title: 'Present your work',
//     text: 'Showcase your work before an evaluation panel and receive constructive academic feedback.',
//   },
// ]

// const researchTracks = [
//   {
//     icon: BrainCircuit,
//     number: '01',
//     title: 'AI & Machine Learning',
//     description:
//       'AI, ML, deep learning, NLP, computer vision and responsible AI.',
//   },
//   {
//     icon: Database,
//     number: '02',
//     title: 'Data Science & Analytics',
//     description:
//       'Data analysis, visualization, big data, predictive analytics and data privacy.',
//   },
//   {
//     icon: Cpu,
//     number: '03',
//     title: 'Emerging Technologies',
//     description:
//       'IoT, cloud, blockchain, cybersecurity, AR/VR, robotics and automation.',
//   },
//   {
//     icon: Leaf,
//     number: '04',
//     title: 'Sustainable Technology',
//     description:
//       'Green computing, renewable energy, smart cities, agriculture and climate technology.',
//   },
//   {
//     icon: Users,
//     number: '05',
//     title: 'Interdisciplinary Innovation',
//     description:
//       'Technology in education, healthcare, agriculture, business, HCI and social innovation.',
//   },
// ]

// const journey = [
//   {
//     number: '01',
//     title: 'Submit',
//     label: 'ROUND 01',
//     text: 'Submit your abstract along with your research poster through the registration portal.',
//   },
//   {
//     number: '02',
//     title: 'Get selected',
//     label: 'SCREENING',
//     text: 'Selected participants receive an acceptance notification and proceed to the next round.',
//   },
//   {
//     number: '03',
//     title: 'Develop',
//     label: 'ROUND 02',
//     text: 'Prepare and submit your complete research paper before the final submission deadline.',
//   },
//   {
//     number: '04',
//     title: 'Present',
//     label: 'FINAL',
//     text: 'Present your work before the evaluation panel on the conference day.',
//   },
// ]

// const timeline = [
//   {
//     date: '30 September 2026',
//     shortDate: '30 SEP',
//     title: 'Abstract & Poster Submission',
//     description: 'Final date for abstract and research poster submission.',
//     status: 'deadline',
//   },
//   {
//     date: '08 October 2026',
//     shortDate: '08 OCT',
//     title: 'Acceptance Notification',
//     description: 'Selected participants are notified about their acceptance.',
//     status: 'notification',
//   },
//   {
//     date: '12 October 2026',
//     shortDate: '12 OCT',
//     title: 'Research Paper Submission',
//     description: 'Complete research paper submission for selected participants.',
//     status: 'deadline',
//   },
//   {
//     date: '14 October 2026',
//     shortDate: '14 OCT',
//     title: 'NEXORA 2026',
//     description: 'Research presentations and evaluation before the panel.',
//     status: 'event',
//   },
// ]

// const details = [
//   {
//     icon: CalendarDays,
//     label: 'Event Date',
//     value: '14 October 2026',
//   },
//   {
//     icon: MapPin,
//     label: 'Venue',
//     value: 'A.P.J. Abdul Kalam Auditorium, HCST',
//   },
//   {
//     icon: Wifi,
//     label: 'Mode',
//     value: 'Online Submission · Offline Presentation',
//   },
//   {
//     icon: Users,
//     label: 'Participants',
//     value: 'Students & student researchers',
//   },
//   {
//     icon: FileText,
//     label: 'Submission',
//     value: 'Abstract + Research Poster',
//   },
//   {
//     icon: IndianRupee,
//     label: 'Registration',
//     value: '₹100',
//   },
// ]

// const eligibility = [
//   'Open to eligible students as per the official announcement.',
//   'Participation can be individual.',
//   'Ideas may come from any relevant discipline or research area.',
//   'Interdisciplinary collaboration is encouraged.',
// ]

// const faculty = [
//   {
//     name: 'Prof. M. S. Gaur',
//     role: 'Dean, Research and Development',
//     note: 'Patron and academic lead',
//   },
//   {
//     name: 'Dr. R. S. Pavithr',
//     role: 'Director, HCST',
//     note: 'Chief patron',
//   },
// ]

// const committee = [
//   {
//     name: 'Byte Club',
//     role: 'Organising committee',
//     note: 'Technical sessions, portal and publicity',
//   },
//   {
//     name: 'Qbit Tech Society',
//     role: 'Organising committee',
//     note: 'Review, proceedings and delegate management',
//   },
// ]

// export default function Landing() {
//   return (
//     <div className="overflow-hidden">

//       {/* =========================================================
//           HERO
//       ========================================================= */}

//       <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">

//         {/* subtle decorative marks */}
//         <div className="absolute top-24 right-0 hidden lg:block font-mono text-[10px] tracking-[0.3em] text-muted rotate-90 origin-right">
//           HCST / FARAH / 2026
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-7"
//         >
//           <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-4 py-2">
//             <span className="w-1.5 h-1.5 rounded-full bg-signal-dark animate-pulse" />
//             <span className="font-mono text-[10px] tracking-[0.18em] text-muted">
//               STUDENT INNOVATION CONFERENCE · 2026
//             </span>
//           </div>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 28 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.75,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="font-display text-[4.5rem] sm:text-8xl lg:text-[9.5rem] leading-[0.84] tracking-[-0.045em] text-ink"
//         >
//           NEXORA
//           <span className="text-muted italic"> 2026</span>
//         </motion.h1>

//         <div className="grid lg:grid-cols-[1fr_0.7fr] gap-10 mt-10 items-end">

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.25, duration: 0.6 }}
//           >
//             <p className="font-hand text-2xl sm:text-3xl text-signal-dark mb-4">
//               Research · Innovate · Make an impact
//             </p>

//             <p className="text-muted text-lg leading-relaxed max-w-2xl">
//               Emerging Technology and Interdisciplinary Student Innovation
//               Conference hosted by the Byte Club and Qbit Tech Society at
//               Hindustan College of Science and Technology, Farah.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="lg:justify-self-end"
//           >
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 to="/register"
//                 className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-signal hover:text-white transition-colors"
//               >
//                 Register now
//                 <ArrowRight
//                   size={15}
//                   className="transition-transform group-hover:translate-x-1"
//                 />
//               </Link>

//               <a
//                 href="#about"
//                 className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-rule text-sm text-ink hover:border-signal transition-colors"
//               >
//                 Explore NEXORA
//               </a>
//             </div>
//           </motion.div>

//         </div>
//       </section>


//       {/* =========================================================
//           THEME — CENTERPIECE
//       ========================================================= */}

//       <section
//         id="theme"
//         className="relative border-y border-rule bg-signal-tint/30"
//       >

//         <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28">

//           <motion.div
//             initial={{ opacity: 0, scale: 0.97 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, margin: '-80px' }}
//             transition={{ duration: 0.7 }}
//             className="relative"
//           >

//             {/* top label */}
//             <div className="flex items-center justify-center gap-4 mb-8">
//               <span className="h-px w-12 sm:w-24 bg-rule" />
//               <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-signal-dark">
//                 NEXORA 2026 · CENTRAL THEME
//               </span>
//               <span className="h-px w-12 sm:w-24 bg-rule" />
//             </div>

//             {/* decorative giant quote */}
//             <div className="absolute left-1/2 -translate-x-1/2 -top-5 font-display text-[10rem] sm:text-[15rem] leading-none text-signal/5 select-none pointer-events-none">
//               “
//             </div>

//             <div className="relative max-w-5xl mx-auto text-center">

//               <p className="font-hand text-2xl sm:text-3xl text-signal-dark mb-6">
//                 The idea behind the conference
//               </p>

//               <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink">
//                 Emerging Technologies
//                 <br />

//                 <span className="italic text-muted">
//                   & Interdisciplinary
//                 </span>

//                 <br />

//                 Student Innovations
//                 <br />

//                 <span className="relative inline-block">
//                   for a Sustainable Future

//                   <span className="absolute left-0 right-0 -bottom-2 sm:-bottom-3 h-1 bg-signal/40 rounded-full" />
//                 </span>
//               </h2>

//               <p className="max-w-2xl mx-auto mt-10 text-muted leading-relaxed">
//                 NEXORA invites students to explore how emerging technologies
//                 can intersect with different disciplines to create thoughtful,
//                 practical and sustainable solutions for the future.
//               </p>

//             </div>

//             {/* bottom metadata */}
//             <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 text-xs font-mono text-muted">
//               <span>TECHNOLOGY</span>
//               <span className="text-signal-dark">✦</span>
//               <span>RESEARCH</span>
//               <span className="text-signal-dark">✦</span>
//               <span>INTERDISCIPLINARY THINKING</span>
//               <span className="text-signal-dark">✦</span>
//               <span>SUSTAINABILITY</span>
//             </div>

//           </motion.div>

//         </div>
//       </section>


//       {/* =========================================================
//           ABOUT
//       ========================================================= */}

//       <section id="about" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-20 mb-16"
//           >

//             <div>
//               <p className="font-mono text-xs text-signal-dark mb-5">
//                 01 — ABOUT
//               </p>

//               <div className="flex items-center gap-3">
//                 <span className="w-10 h-px bg-signal" />
//                 <span className="font-hand text-xl text-signal-dark">
//                   A platform for ideas
//                 </span>
//               </div>
//             </div>

//             <div>
//               <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
//                 Not a lecture.
//                 <br />
//                 Not just a
//                 <span className="italic text-muted"> competition.</span>
//                 <br />
//                 A space to
//                 <span className="italic"> create.</span>
//               </h2>
//             </div>

//           </motion.div>


//           <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">

//             {/* main about card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ duration: 0.6 }}
//               className="rounded-[2rem] border border-rule bg-surface p-8 sm:p-12"
//             >

//               <div className="flex items-center justify-between mb-10">
//                 <div className="w-12 h-12 rounded-xl bg-signal-tint flex items-center justify-center">
//                   <Microscope size={21} className="text-signal-dark" />
//                 </div>

//                 <span className="font-mono text-xs text-muted">
//                   NEXORA / 01
//                 </span>
//               </div>

//               <h3 className="font-display text-3xl sm:text-4xl mb-6">
//                 What is NEXORA?
//               </h3>

//               <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
//                 NEXORA 2026 is a student research conference built around
//                 exploration, innovation and interdisciplinary thinking.
//               </p>

//               <p className="text-muted leading-relaxed">
//                 It gives students an opportunity to work on their own ideas,
//                 investigate real-world problems, collaborate across
//                 disciplines and present their work before an evaluation panel.
//                 The goal is to encourage students to think beyond classroom
//                 assignments and develop an early research-oriented mindset.
//               </p>

//             </motion.div>


//             {/* quote / identity card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ delay: 0.1, duration: 0.6 }}
//               className="relative rounded-[2rem] border border-rule bg-ink text-paper p-8 sm:p-12 overflow-hidden flex flex-col justify-between"
//             >

//               <Sparkles
//                 size={22}
//                 className="absolute top-8 right-8 text-signal"
//               />

//               <div>
//                 <p className="font-mono text-xs text-paper/50 mb-12">
//                   THE NEXORA MINDSET
//                 </p>

//                 <p className="font-display text-4xl sm:text-5xl leading-tight">
//                   “Ideas become
//                   <span className="italic text-paper/60"> meaningful</span>
//                   when they are explored,
//                   <span className="italic text-paper/60"> tested</span>
//                   and shared.”
//                 </p>
//               </div>

//               <div className="mt-12 flex items-center gap-3">
//                 <span className="w-8 h-px bg-signal" />
//                 <span className="font-mono text-[10px] text-paper/50 tracking-wider">
//                   STUDENT RESEARCH · INNOVATION · IMPACT
//                 </span>
//               </div>

//             </motion.div>

//           </div>


//           {/* four pillars */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule rounded-2xl overflow-hidden mt-5">

//             {aboutPoints.map((item, index) => {
//               const Icon = item.icon

//               return (
//                 <motion.div
//                   key={item.title}
//                   initial={{ opacity: 0, y: 15 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.07 }}
//                   className="bg-paper p-7 group hover:bg-signal-tint/30 transition-colors"
//                 >

//                   <div className="flex justify-between items-start mb-9">
//                     <div className="w-10 h-10 rounded-full border border-rule flex items-center justify-center group-hover:border-signal transition-colors">
//                       <Icon size={17} className="text-signal-dark" />
//                     </div>

//                     <span className="font-mono text-[10px] text-muted">
//                       0{index + 1}
//                     </span>
//                   </div>

//                   <h4 className="font-display text-xl mb-2">
//                     {item.title}
//                   </h4>

//                   <p className="text-xs text-muted leading-relaxed">
//                     {item.text}
//                   </p>

//                 </motion.div>
//               )
//             })}

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           WHO CAN JOIN
//       ========================================================= */}

//       <section id="eligibility" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-20 items-center">

//             <motion.div
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, margin: '-80px' }}
//               variants={fade}
//             >

//               <p className="font-mono text-xs text-signal-dark mb-5">
//                 02 — PARTICIPATION
//               </p>

//               <h2 className="font-display text-5xl sm:text-6xl tracking-tight leading-none">
//                 Who can
//                 <span className="italic text-muted"> join?</span>
//               </h2>

//               <p className="text-muted leading-relaxed mt-6 max-w-md">
//                 NEXORA is designed to give students an accessible platform
//                 for presenting ideas, research and innovation.
//               </p>

//               <div className="mt-8 inline-flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-full bg-signal-tint flex items-center justify-center">
//                   <Users size={19} className="text-signal-dark" />
//                 </div>

//                 <span className="text-sm font-medium">
//                   Student-focused · Interdisciplinary · Research-driven
//                 </span>
//               </div>

//             </motion.div>


//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ duration: 0.6 }}
//               className="rounded-[2rem] border border-rule bg-surface p-8 sm:p-10"
//             >

//               <div className="grid sm:grid-cols-2 gap-4">

//                 {eligibility.map((item, index) => (
//                   <div
//                     key={item}
//                     className="rounded-2xl border border-rule bg-paper p-6"
//                   >

//                     <div className="w-8 h-8 rounded-full bg-signal-tint flex items-center justify-center mb-5">
//                       <Check
//                         size={15}
//                         className="text-signal-dark"
//                       />
//                     </div>

//                     <p className="text-sm text-muted leading-relaxed">
//                       {item}
//                     </p>

//                     <span className="block mt-5 font-mono text-[10px] text-muted">
//                       0{index + 1}
//                     </span>

//                   </div>
//                 ))}

//               </div>

//             </motion.div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           RESEARCH TRACKS
//       ========================================================= */}

//       <section id="tracks" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="mb-14"
//           >

//             <p className="font-mono text-xs text-signal-dark mb-5">
//               03 — RESEARCH TRACKS
//             </p>

//             <div className="grid lg:grid-cols-[1fr_0.65fr] gap-8 items-end">

//               <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
//                 Ideas without
//                 <span className="italic text-muted"> boundaries.</span>
//               </h2>

//               <p className="text-muted leading-relaxed max-w-md">
//                 Explore a broad range of research directions. Other relevant
//                 topics may also be considered during screening.
//               </p>

//             </div>

//           </motion.div>


//           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">

//             {researchTracks.map((track, index) => {
//               const Icon = track.icon

//               return (
//                 <motion.div
//                   key={track.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: '-50px' }}
//                   transition={{ delay: index * 0.06 }}
//                   whileHover={{ y: -5 }}
//                   className="group rounded-2xl border border-rule bg-surface p-6 hover:border-signal/60 transition-colors"
//                 >

//                   <div className="flex items-start justify-between mb-12">

//                     <div className="w-11 h-11 rounded-full bg-signal-tint flex items-center justify-center">
//                       <Icon size={18} className="text-signal-dark" />
//                     </div>

//                     <span className="font-mono text-[10px] text-muted">
//                       {track.number}
//                     </span>

//                   </div>

//                   <h3 className="font-display text-xl leading-tight mb-3">
//                     {track.title}
//                   </h3>

//                   <p className="text-xs text-muted leading-relaxed">
//                     {track.description}
//                   </p>

//                   <div className="mt-7 flex items-center justify-between">

//                     <span className="w-8 h-px bg-rule group-hover:w-14 group-hover:bg-signal transition-all" />

//                     <ArrowUpRight
//                       size={15}
//                       className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
//                     />

//                   </div>

//                 </motion.div>
//               )
//             })}

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           HOW IT WORKS
//       ========================================================= */}

//       <section id="process" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="grid lg:grid-cols-[0.65fr_1.35fr] gap-10 lg:gap-20 mb-16"
//           >

//             <div>
//               <p className="font-mono text-xs text-signal-dark mb-5">
//                 04 — THE JOURNEY
//               </p>

//               <h2 className="font-display text-5xl sm:text-6xl leading-none">
//                 From idea
//                 <br />
//                 to
//                 <span className="italic text-muted"> presentation.</span>
//               </h2>
//             </div>

//             <div className="lg:pt-10">
//               <p className="text-muted text-lg leading-relaxed max-w-xl">
//                 NEXORA takes your work through a structured research journey,
//                 from the first abstract to the final presentation before the
//                 evaluation panel.
//               </p>
//             </div>

//           </motion.div>


//           <div className="relative">

//             {/* connecting line */}
//             <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-8 h-px bg-rule" />

//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

//               {journey.map((item, index) => (
//                 <motion.div
//                   key={item.number}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.08 }}
//                   className="relative"
//                 >

//                   <div className="relative z-10 w-16 h-16 rounded-full border border-rule bg-paper flex items-center justify-center font-display text-xl text-signal-dark mb-7">
//                     {item.number}
//                   </div>

//                   <p className="font-mono text-[10px] tracking-wider text-signal-dark mb-2">
//                     {item.label}
//                   </p>

//                   <h3 className="font-display text-2xl mb-3">
//                     {item.title}
//                   </h3>

//                   <p className="text-sm text-muted leading-relaxed">
//                     {item.text}
//                   </p>

//                 </motion.div>
//               ))}

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           IMPORTANT DETAILS
//       ========================================================= */}

//       <section id="details" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="mb-14"
//           >

//             <p className="font-mono text-xs text-signal-dark mb-5">
//               05 — EVENT DETAILS
//             </p>

//             <h2 className="font-display text-5xl sm:text-6xl tracking-tight">
//               Everything you need
//               <span className="italic text-muted"> to know.</span>
//             </h2>

//           </motion.div>


//           <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-5">

//             {/* event date feature */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="rounded-[2rem] bg-ink text-paper p-8 sm:p-10 flex flex-col justify-between min-h-[330px]"
//             >

//               <div className="flex items-center justify-between">
//                 <CalendarDays size={24} className="text-signal" />

//                 <span className="font-mono text-[10px] text-paper/50">
//                   SAVE THE DATE
//                 </span>
//               </div>

//               <div>
//                 <p className="font-mono text-xs text-paper/50 mb-3">
//                   WEDNESDAY
//                 </p>

//                 <p className="font-display text-7xl sm:text-8xl leading-none">
//                   14
//                 </p>

//                 <p className="font-display text-3xl mt-2">
//                   October 2026
//                 </p>

//                 <p className="text-sm text-paper/60 mt-5">
//                   NEXORA 2026 Conference Day
//                 </p>
//               </div>

//             </motion.div>


//             {/* details grid */}
//             <div className="grid sm:grid-cols-2 gap-3">

//               {details.map((detail, index) => {
//                 const Icon = detail.icon

//                 return (
//                   <motion.div
//                     key={detail.label}
//                     initial={{ opacity: 0, y: 15 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.05 }}
//                     className="rounded-2xl border border-rule bg-surface p-6"
//                   >

//                     <div className="flex items-center justify-between mb-8">

//                       <div className="w-9 h-9 rounded-lg bg-signal-tint flex items-center justify-center">
//                         <Icon size={16} className="text-signal-dark" />
//                       </div>

//                       <span className="font-mono text-[10px] text-muted">
//                         0{index + 1}
//                       </span>

//                     </div>

//                     <p className="font-mono text-[10px] text-muted mb-2 uppercase">
//                       {detail.label}
//                     </p>

//                     <p className="text-sm text-ink leading-relaxed">
//                       {detail.value}
//                     </p>

//                   </motion.div>
//                 )
//               })}

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           TIMELINE
//       ========================================================= */}

//       <section id="timeline" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
//           >

//             <div>
//               <p className="font-mono text-xs text-signal-dark mb-5">
//                 06 — IMPORTANT TIMELINE
//               </p>

//               <h2 className="font-display text-5xl sm:text-6xl leading-none">
//                 Mark the
//                 <span className="italic text-muted"> dates.</span>
//               </h2>
//             </div>

//             <p className="text-sm text-muted max-w-md leading-relaxed">
//               Dates shown below follow the current tentative conference
//               schedule and should be checked against official announcements.
//             </p>

//           </motion.div>


//           <div className="relative">

//             <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-rule" />

//             <div className="grid md:grid-cols-4 gap-8">

//               {timeline.map((item, index) => (
//                 <motion.div
//                   key={item.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.08 }}
//                   className="relative"
//                 >

//                   <div className="relative z-10 w-16 h-16 rounded-full bg-paper border border-rule flex items-center justify-center font-mono text-xs text-signal-dark mb-7">
//                     {item.shortDate}
//                   </div>

//                   <p className="font-mono text-[10px] text-signal-dark mb-2">
//                     {item.date}
//                   </p>

//                   <h3 className="font-display text-xl mb-3">
//                     {item.title}
//                   </h3>

//                   <p className="text-sm text-muted leading-relaxed">
//                     {item.description}
//                   </p>

//                   {item.status === 'event' && (
//                     <span className="inline-flex mt-5 items-center gap-2 rounded-full bg-signal-tint px-3 py-1.5 font-mono text-[10px] text-signal-dark">
//                       <span className="w-1.5 h-1.5 rounded-full bg-signal-dark" />
//                       CONFERENCE DAY
//                     </span>
//                   )}

//                 </motion.div>
//               ))}

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           FACULTY + COMMITTEE
//       ========================================================= */}

//       <section id="team" className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="mb-14"
//           >

//             <p className="font-mono text-xs text-signal-dark mb-5">
//               07 — THE PEOPLE
//             </p>

//             <h2 className="font-display text-5xl sm:text-6xl tracking-tight">
//               Guided by mentors.
//               <br />
//               <span className="italic text-muted">
//                 Driven by students.
//               </span>
//             </h2>

//           </motion.div>


//           <div className="grid lg:grid-cols-2 gap-12">

//             <TeamGroup
//               label="FACULTY MENTORS"
//               people={faculty}
//             />

//             <TeamGroup
//               label="STUDENT COMMITTEE"
//               people={committee}
//             />

//           </div>

//         </div>
//       </section>


//       {/* =========================================================
//           RULEBOOK / FINAL INFORMATION
//       ========================================================= */}

//       <section className="border-b border-rule">

//         <div className="max-w-6xl mx-auto px-6 py-20">

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="rounded-[2rem] border border-rule bg-signal-tint/40 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
//           >

//             <div className="flex items-start gap-5">

//               <div className="w-12 h-12 rounded-xl bg-paper border border-rule flex items-center justify-center shrink-0">
//                 <BookOpen size={20} className="text-signal-dark" />
//               </div>

//               <div>
//                 <p className="font-mono text-[10px] tracking-wider text-signal-dark mb-2">
//                   BEFORE YOU SUBMIT
//                 </p>

//                 <h3 className="font-display text-3xl">
//                   Go through the rulebook.
//                 </h3>

//                 <p className="text-sm text-muted mt-2 max-w-xl">
//                   Check the submission requirements, evaluation process and
//                   participation guidelines before preparing your work.
//                 </p>
//               </div>

//             </div>

//             <button
//               type="button"
//               className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rule bg-paper text-sm font-medium hover:border-signal transition-colors"
//             >
//               View guidelines
//               <ArrowUpRight
//                 size={15}
//                 className="transition-transform group-hover:translate-x-0.5"
//               />
//             </button>

//           </motion.div>

//         </div>
//       </section>


//       {/* =========================================================
//           FINAL CTA
//       ========================================================= */}

//       <section id="register" className="relative">

//         <div className="max-w-6xl mx-auto px-6 py-28 sm:py-36">

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: '-80px' }}
//             variants={fade}
//             className="text-center"
//           >

//             <p className="font-hand text-2xl sm:text-3xl text-signal-dark mb-5">
//               Your idea could be the beginning.
//             </p>

//             <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
//               Bring your
//               <span className="italic text-muted"> research.</span>
//               <br />
//               Shape the
//               <span className="italic"> future.</span>
//             </h2>

//             <p className="text-muted max-w-lg mx-auto mt-8 leading-relaxed">
//               Explore a problem. Build an idea. Share your work.
//               Take the first step towards NEXORA 2026.
//             </p>

//             <div className="mt-10 flex flex-wrap justify-center gap-4">

//               <Link
//                 to="/register"
//                 className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-paper text-sm font-medium hover:bg-signal hover:text-white transition-colors"
//               >
//                 Register for NEXORA 2026

//                 <ArrowRight
//                   size={15}
//                   className="transition-transform group-hover:translate-x-1"
//                 />
//               </Link>

//               <a
//                 href="#theme"
//                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-rule text-sm text-ink hover:border-signal transition-colors"
//               >
//                 Revisit the theme
//               </a>

//             </div>

//           </motion.div>

//         </div>

//       </section>

//     </div>
//   )
// }


// /* =============================================================
//    TEAM GROUP
// ============================================================= */

// function TeamGroup({ label, people }) {
//   return (
//     <div>

//       <p className="font-mono text-xs text-muted mb-5">
//         {label}
//       </p>

//       <div className="space-y-3">

//         {people.map((person, index) => (
//           <PersonCard
//             key={person.name}
//             person={person}
//             delay={index * 0.08}
//           />
//         ))}

//       </div>

//     </div>
//   )
// }


// /* =============================================================
//    PERSON CARD
// ============================================================= */

// function PersonCard({ person, delay }) {

//   const initials = person.name
//     .replace(/^(Prof\.|Dr\.)\s*/, '')
//     .split(' ')
//     .map((word) => word[0])
//     .slice(0, 2)
//     .join('')

//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, margin: '-60px' }}
//       variants={fade}
//       transition={{ delay }}
//       whileHover={{ y: -3 }}
//       className="group flex items-center gap-5 rounded-2xl border border-rule bg-surface p-6 hover:border-signal/50 transition-colors"
//     >

//       <div className="w-14 h-14 rounded-full border border-rule flex items-center justify-center font-display text-lg text-signal-dark shrink-0">
//         {initials}
//       </div>

//       <div className="min-w-0 flex-1">

//         <p className="font-display text-xl text-ink truncate">
//           {person.name}
//         </p>

//         <p className="text-sm text-muted">
//           {person.role}
//         </p>

//         <p className="text-xs text-muted/70 mt-0.5">
//           {person.note}
//         </p>

//       </div>

//       <ArrowUpRight
//         size={16}
//         className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
//       />

//     </motion.div>
//   )
// }

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Check,
  Cpu,
  Database,
  FileText,
  IndianRupee,
  Leaf,
  Lightbulb,
  MapPin,
  Presentation,
  Target,
  Users,
  Wifi,
} from 'lucide-react'

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const about = [
  {
    title: 'Student-led, end to end',
    body: 'Every part — call for papers, review, sessions, stage and hospitality — is planned and run by student teams. Faculty serve as mentors only.',
  },
  {
    title: 'Open across disciplines',
    body: 'Submissions welcome from every department. A genuinely collaborative platform, not a single-branch showcase.',
  },
  {
    title: 'Reviewed and published',
    body: 'Abstracts are peer-reviewed. Selected work is presented in technical sessions and included in proceedings.',
  },
]

const eligibility = [
  'Open to eligible students as per the official announcement.',
  'Participation can be individual.',
  'Ideas may come from any relevant discipline or research area.',
  'Interdisciplinary collaboration is encouraged.',
]

const journey = [
  {
    number: '01',
    label: 'ROUND 01',
    title: 'Submit',
    text: 'Submit your abstract along with your research poster through the registration portal.',
  },
  {
    number: '02',
    label: 'SCREENING',
    title: 'Get selected',
    text: 'Selected participants receive an acceptance notification and proceed to the next round.',
  },
  {
    number: '03',
    label: 'ROUND 02',
    title: 'Develop',
    text: 'Prepare and submit your complete research paper before the final submission deadline.',
  },
  {
    number: '04',
    label: 'FINAL',
    title: 'Present',
    text: 'Present your work before the evaluation panel on the conference day.',
  },
]

const eventDetails = [
  {
    icon: CalendarDays,
    label: 'Event Date',
    value: '14 October 2026',
  },
  {
    icon: MapPin,
    label: 'Venue',
    value: 'A.P.J. Abdul Kalam Auditorium, HCST',
  },
  {
    icon: Wifi,
    label: 'Mode',
    value: 'Online Submission · Offline Presentation',
  },
  {
    icon: Users,
    label: 'Participants',
    value: 'Students & student researchers',
  },
  {
    icon: FileText,
    label: 'Submission',
    value: 'Abstract + Research Poster',
  },
  {
    icon: IndianRupee,
    label: 'Registration',
    value: '₹100 confirmation fee after selection',
  },
]

const faculty = [
  { name: 'Shri P.K Gupta', role: 'Chairman' },
  { name: 'Shri Y.K Gupta', role: 'Vice Chairman' },
  { name: 'Dr. R.S Pavithra', role: 'Director' },
  { name: 'Prof. M.S. Gaur', role: 'Convener' },
  { name: 'Mr. Gaurav Pandey', role: 'Faculty Coordinator' },
  { name: 'Mr. Utkarsh Gupta', role: 'Faculty Coordinator' },
]

const committee = [
  {
    name: 'Byte Club',
    role: 'Organising committee',
    note: 'Technical sessions, portal and publicity',
  },
  {
    name: 'Qbit Club',
    role: 'Organising committee',
    note: 'Review, proceedings and delegate management',
  },
]

const researchTracks = [
  {
    icon: BrainCircuit,
    number: '01',
    title: 'AI & Machine Learning',
    description:
      'AI, ML, deep learning, NLP, computer vision and responsible AI.',
  },
  {
    icon: Database,
    number: '02',
    title: 'Data Science & Analytics',
    description:
      'Data analysis, visualization, big data, predictive analytics and data privacy.',
  },
  {
    icon: Cpu,
    number: '03',
    title: 'Emerging Technologies',
    description:
      'IoT, cloud, blockchain, cybersecurity, AR/VR, robotics and automation.',
  },
  {
    icon: Leaf,
    number: '04',
    title: 'Sustainable Technology',
    description:
      'Green computing, renewable energy, smart cities, agriculture and climate technology.',
  },
  {
    icon: Users,
    number: '05',
    title: 'Interdisciplinary Innovation',
    description:
      'Technology in education, healthcare, agriculture, business, HCI and social innovation.',
  },
]

export default function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-24 sm:pt-32 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, rotate: -4 }}
          animate={{ opacity: 1, rotate: -3 }}
          transition={{ duration: 0.4 }}
          className="inline-block font-mono text-xs uppercase tracking-widest bg-signal text-black px-4 py-2 mb-8 border-2 border-ink shadow-brutal-sm"
        >
          A student conference
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display uppercase text-7xl sm:text-9xl leading-[0.85] tracking-tight mb-8"
          style={{ textShadow: '8px 8px 0 #FF3E9A' }}
        >
          NEXORA
          <br />
          <span
            className="text-signal"
            style={{ textShadow: '8px 8px 0 #F7F7F2' }}
          >
            2026
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-muted text-lg leading-relaxed max-w-content mb-10"
        >
          A student innovation conference hosted by the Byte and Qbit clubs at
          Hindustan College of Science and Technology, Farah. Registration and
          abstract submission are free — a ₹100 confirmation fee applies only
          to participants shortlisted for the final round.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center gap-5"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 px-7 py-4 bg-signal text-black font-display uppercase tracking-wide text-sm border-2 border-ink shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Register — free
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <a
            href="#about"
            className="inline-flex items-center gap-1.5 px-7 py-4 border-2 border-ink text-ink font-display uppercase tracking-wide text-sm hover:bg-byte hover:border-byte hover:text-black transition-colors"
          >
            Learn more
          </a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="01"
            label="ABOUT"
            title={
              <>
                Run by students. <span className="text-byte">For students.</span>
              </>
            }
            description="NEXORA gives students ownership of every aspect of a professional academic conference — and a chance to present ideas, get real feedback, and build a research mindset early."
          />

          <div className="grid sm:grid-cols-3 border-2 border-ink">
            {about.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={fade}
                transition={{ delay: index * 0.1 }}
                className={`p-8 ${index !== about.length - 1
                    ? 'border-b-2 sm:border-b-0 sm:border-r-2 border-ink'
                    : ''
                  }`}
              >
                <h3 className="font-display uppercase text-xl mb-3 text-ink">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THEME */}
      <section id="theme" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            className="border-2 border-ink bg-surface p-8 sm:p-12 shadow-brutal"
          >
            <div className="flex items-center justify-between mb-12">
              <p className="font-mono text-xs text-signal tracking-widest">
                02 — CENTRAL THEME
              </p>

              <span className="font-mono text-xs text-muted">
                NEXORA / 2026
              </span>
            </div>

            <div className="text-center">
              <p className="font-mono text-xs text-muted mb-6 tracking-widest">
                EMERGING TECHNOLOGIES · INTERDISCIPLINARY INNOVATION
              </p>

              <h2 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                Student Innovations
                <br />
                <span className="italic text-muted">for a</span>{' '}
                <span className="text-signal">Sustainable Future</span>
              </h2>

              <p className="max-w-2xl mx-auto mt-8 text-muted leading-relaxed">
                NEXORA invites students to explore how emerging technologies
                can intersect with different disciplines to create thoughtful,
                practical and sustainable solutions for the future.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t-2 border-rule">
              {[
                'TECHNOLOGY',
                'RESEARCH',
                'INTERDISCIPLINARY THINKING',
                'SUSTAINABILITY',
              ].map((item, index, items) => (
                <span key={item} className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-muted">
                    {item}
                  </span>

                  {index !== items.length - 1 && (
                    <span className="text-signal">✦</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESEARCH TRACKS */}
      <section id="tracks" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="03"
            label="RESEARCH TRACKS"
            title={
              <>
                Explore. <span className="text-byte">Research.</span> Build.
              </>
            }
            description="NEXORA welcomes research and innovation across emerging technologies, sustainability and interdisciplinary applications."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {researchTracks.map((track, index) => {
              const Icon = track.icon

              return (
                <motion.div
                  key={track.number}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fade}
                  transition={{ delay: index * 0.08 }}
                  className="border-2 border-ink bg-surface p-7"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 border-2 border-ink flex items-center justify-center">
                      <Icon size={20} className="text-signal" />
                    </div>

                    <span className="font-mono text-xs text-muted">
                      {track.number}
                    </span>
                  </div>

                  <h3 className="font-display uppercase text-2xl mb-3">
                    {track.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {track.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PARTICIPATION */}
      <section id="eligibility" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="04"
            label="PARTICIPATION"
            title={
              <>
                Who can <span className="italic text-muted">join?</span>
              </>
            }
            description="NEXORA is designed to give students an accessible platform for presenting ideas, research and innovation."
          />

          <div className="grid sm:grid-cols-2 border-2 border-ink">
            {eligibility.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                transition={{ delay: index * 0.08 }}
                className={`p-7 ${index < 2 ? 'border-b-2 border-ink' : ''
                  } ${index % 2 === 0 ? 'sm:border-r-2 border-ink' : ''}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-9 h-9 border-2 border-ink flex items-center justify-center">
                    <Check size={15} className="text-signal" />
                  </div>

                  <span className="font-mono text-[10px] text-muted">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="process" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="05"
            label="THE JOURNEY"
            title={
              <>
                From idea
                <br />
                to <span className="italic text-muted">presentation.</span>
              </>
            }
            description="NEXORA takes your work through a structured research journey, from the first abstract to the final presentation before the evaluation panel."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {journey.map((item, index) => (
              <motion.div
                key={item.number}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                transition={{ delay: index * 0.08 }}
                className="border-2 border-ink bg-surface p-7"
              >
                <div className="w-14 h-14 border-2 border-ink bg-paper flex items-center justify-center font-display text-xl text-signal mb-8">
                  {item.number}
                </div>

                <p className="font-mono text-[10px] tracking-widest text-signal mb-2">
                  {item.label}
                </p>

                <h3 className="font-display uppercase text-2xl mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section id="details" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="06"
            label="EVENT DETAILS"
            title={
              <>
                Everything you need
                <span className="italic text-muted"> to know.</span>
              </>
            }
          />

          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-5">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="border-2 border-ink bg-ink text-paper p-8 sm:p-10 min-h-[330px] flex flex-col justify-between shadow-brutal"
            >
              <div className="flex items-center justify-between">
                <CalendarDays size={23} className="text-signal" />

                <span className="font-mono text-[10px] text-paper/50">
                  SAVE THE DATE
                </span>
              </div>

              <div>
                <p className="font-mono text-xs text-paper/50 mb-3">
                  WEDNESDAY
                </p>

                <p className="font-display text-7xl sm:text-8xl leading-none">
                  14
                </p>

                <p className="font-display text-3xl mt-2">
                  October 2026
                </p>

                <p className="text-sm text-paper/60 mt-5">
                  NEXORA 2026 Conference Day
                </p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {eventDetails.map((detail, index) => {
                const Icon = detail.icon

                return (
                  <motion.div
                    key={detail.label}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fade}
                    transition={{ delay: index * 0.05 }}
                    className="border-2 border-ink bg-surface p-6"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-9 h-9 border-2 border-ink flex items-center justify-center">
                        <Icon size={16} className="text-signal" />
                      </div>

                      <span className="font-mono text-[10px] text-muted">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="font-mono text-[10px] text-muted mb-2 uppercase">
                      {detail.label}
                    </p>

                    <p className="text-sm text-ink leading-relaxed">
                      {detail.value}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="leadership" className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="07"
            label="LEADERSHIP"
            title={
              <>
                Our <span className="text-signal">faculty</span>
              </>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {faculty.map((person, index) => (
              <motion.div
                key={person.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={fade}
                transition={{ delay: index * 0.06 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 border-2 border-ink bg-surface flex items-center justify-center font-display text-lg text-signal">
                  {initialsFor(person.name)}
                </div>

                <p className="text-[13px] font-medium text-ink">
                  {person.name}
                </p>

                <p className="text-[11px] font-mono uppercase text-muted mt-0.5">
                  {person.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITTEE */}
      <section className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeading
            number="08"
            label="COMMITTEE"
            title={
              <>
                Organising <span className="text-byte">clubs</span>
              </>
            }
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {committee.map((person, index) => (
              <PersonCard
                key={person.name}
                person={person}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-rule">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
          >
            <p className="inline-block font-mono text-xs uppercase tracking-widest bg-byte text-black px-4 py-2 mb-6 border-2 border-ink -rotate-2">
              We'd love to see your work
            </p>

            <h2 className="font-display uppercase text-5xl sm:text-7xl tracking-tight mb-6">
              Present at <span className="text-signal">NEXORA</span>
            </h2>

            <p className="text-muted mb-10 max-w-md mx-auto">
              Registration and abstract submission are free. Seats and speaker
              slots are limited.
            </p>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-9 py-4 bg-signal text-black font-display uppercase tracking-wide text-sm border-2 border-ink shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Register for NEXORA 2026

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function SectionHeading({ number, label, title, description }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fade}
      className="mb-14 max-w-2xl"
    >
      <p className="font-mono text-xs text-signal mb-4 tracking-widest">
        {number} — {label}
      </p>

      <h2 className="font-display uppercase text-4xl sm:text-6xl tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="text-muted leading-relaxed mt-5">{description}</p>
      )}
    </motion.div>
  )
}

function initialsFor(name) {
  const cleanName = name.replace(/^(Prof\.|Dr\.|Shri|Mr\.)\s*/, '')

  return cleanName
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
}

function PersonCard({ person, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fade}
      transition={{ delay }}
      whileHover={{ x: -3, y: -3 }}
      className="group flex items-center gap-5 border-2 border-ink bg-surface p-6 shadow-brutal hover:shadow-brutal-lime transition-all"
    >
      <div className="w-14 h-14 border-2 border-ink flex items-center justify-center font-display text-lg text-signal shrink-0">
        {initialsFor(person.name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display uppercase text-xl text-ink truncate">
          {person.name}
        </p>

        <p className="text-sm font-mono uppercase text-muted">
          {person.role}
        </p>

        <p className="text-xs text-muted/70 mt-0.5">{person.note}</p>
      </div>

      <ArrowUpRight
        size={16}
        className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      />
    </motion.div>
  )
}

