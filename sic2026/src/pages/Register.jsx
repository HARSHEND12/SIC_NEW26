
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  UploadCloud,
  FileCheck2,
  X,
  ArrowRight,
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'


/* =========================================================
   CONSTANTS
   ========================================================= */

const tracks = [
  'Paper presentation',
  'Project demo',
  'Poster',
  'Attendee only',
]

const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Other',
]

const years = [
  '1st year',
  '2nd year',
  '3rd year',
  '4th year',
]

const abstractTracks = [
  'Paper presentation',
  'Poster',
]

const MAX_FILE_BYTES = 10 * 1024 * 1024


/* =========================================================
   FORM SCHEMA
   ========================================================= */

const schema = z.object({
  fullName: z
    .string()
    .min(2, 'Enter your full name'),

  rollNumber: z
    .string()
    .min(3, 'Enter your roll number'),

  email: z
    .string()
    .email('Enter a valid email'),

  phone: z
    .string()
    .min(10, 'Enter a valid phone number'),

  department: z
    .string()
    .min(1, 'Select your department'),

  year: z
    .string()
    .min(1, 'Select your year'),

  collegeName: z
    .string()
    .min(2, 'Enter your college name'),

  track: z
    .string()
    .min(1, 'Select a track'),

  abstractTitle: z
    .string()
    .optional(),

  abstractText: z
    .string()
    .optional(),
})


/* =========================================================
   REGISTER COMPONENT
   ========================================================= */

export default function Register() {
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [abstractFile, setAbstractFile] = useState(null)
  const [fileError, setFileError] = useState('')


  /* =======================================================
     REACT HOOK FORM
     ======================================================= */

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      track: tracks[0],
      collegeName:
        'Hindustan College of Science and Technology, Farah (Mathura)',
    },
  })


  /* =======================================================
     TRACK / ABSTRACT LOGIC
     ======================================================= */

  const selectedTrack = watch('track')

  const needsAbstract =
    abstractTracks.includes(selectedTrack)


  /* =======================================================
     FILE HANDLING
     ======================================================= */

  function handleFileChange(e) {
    const file = e.target.files?.[0]

    setFileError('')

    if (!file) {
      setAbstractFile(null)
      return
    }

    /* PDF validation */
    if (file.type !== 'application/pdf') {
      setFileError('Only PDF files are accepted.')
      e.target.value = ''
      return
    }

    /* File size validation */
    if (file.size > MAX_FILE_BYTES) {
      setFileError(
        'File is larger than 10MB. Compress it and try again.'
      )
      e.target.value = ''
      return
    }

    setAbstractFile(file)
  }


  /* =======================================================
     FORM SUBMISSION
     ======================================================= */

  const onSubmit = async (data) => {
    setSubmitting(true)
    setServerError('')


    /* -------------------------------------------------------
       ABSTRACT VALIDATION
       ------------------------------------------------------- */

    if (
      needsAbstract &&
      !data.abstractText?.trim() &&
      !abstractFile
    ) {
      setServerError(
        'Add an abstract — either type it or upload a PDF.'
      )

      setSubmitting(false)
      return
    }


    try {
      let abstractFilePath = null


      /* -----------------------------------------------------
         UPLOAD ABSTRACT PDF
         ----------------------------------------------------- */

      if (needsAbstract && abstractFile) {
        const path = `${crypto.randomUUID()}.pdf`

        const { error: uploadError } =
          await supabase.storage
            .from('abstracts')
            .upload(path, abstractFile, {
              contentType: 'application/pdf',
            })

        if (uploadError) {
          throw new Error(
            `Could not upload PDF: ${uploadError.message}`
          )
        }

        abstractFilePath = path
      }


      /* -----------------------------------------------------
         CREATE REGISTRATION
         ----------------------------------------------------- */

      const {
        data: reg,
        error: insertError,
      } = await supabase.rpc(
        'submit_registration',
        {
          p_full_name: data.fullName,
          p_roll_number: data.rollNumber,
          p_email: data.email,
          p_phone: data.phone,
          p_department: data.department,
          p_year: data.year,
          p_college_name: data.collegeName,
          p_track: data.track,

          p_abstract_title: needsAbstract
            ? data.abstractTitle
            : null,

          p_abstract_text: needsAbstract
            ? data.abstractText
            : null,

          p_abstract_file_path:
            abstractFilePath,
        }
      )


      /* -----------------------------------------------------
         DATABASE ERROR HANDLING
         ----------------------------------------------------- */

      if (insertError) {
        if (insertError.code === '23505') {
          throw new Error(
            'You’ve already registered with this email. Use "Status" in the top nav to find your ticket.'
          )
        }

        throw insertError
      }


      /* -----------------------------------------------------
         SAFETY CHECK
         ----------------------------------------------------- */

      if (!reg?.id) {
        throw new Error(
          'Registration was created, but no registration ID was returned.'
        )
      }


      /* -----------------------------------------------------
         SEND STATUS EMAIL
         ----------------------------------------------------- */

      let emailSent = true

      try {
        const {
          data: result,
          error: fnError,
        } = await supabase.functions.invoke(
          'send-status-email',
          {
            body: {
              email: reg.email,
              fullName: reg.full_name,
              status: 'submitted',
              registrationId: reg.id,
            },
          }
        )

        emailSent =
          !fnError &&
          !!result?.sent
      } catch {
        /*
         * Email failure should not block registration.
         */
        emailSent = false
      }


      /* -----------------------------------------------------
         REDIRECT TO TICKET
         ----------------------------------------------------- */

      navigate(
        `/ticket/${reg.id}`,
        {
          state: {
            emailSent,
          },
        }
      )

    } catch (err) {
      setServerError(
        err?.message ||
        'Something went wrong. Please try again.'
      )

      setSubmitting(false)
    }
  }


  /* =========================================================
     UI
     ========================================================= */

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">

      {/* -----------------------------------------------------
          PAGE HEADER
          ----------------------------------------------------- */}

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-12"
      >
        <p className="font-mono text-xs text-signal-dark mb-4">
          REGISTRATION — FREE
        </p>

        <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-5">
          Register for{' '}
          <span className="italic">
            NEXORA
          </span>
        </h1>

        <p className="text-muted leading-relaxed max-w-content">
          Registration and abstract submission are free.
          The organising committee reviews every submission
          and shortlists participants for the final round —
          only shortlisted participants pay a ₹100
          confirmation fee at that stage.
        </p>
      </motion.div>


      {/* -----------------------------------------------------
          REGISTRATION FORM
          ----------------------------------------------------- */}

      <motion.form
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-rule bg-surface p-8 sm:p-10 space-y-8"
        noValidate
      >

        {/* ===================================================
            01 — YOUR DETAILS
            =================================================== */}

        <Section label="01 — YOUR DETAILS">

          <div className="grid sm:grid-cols-2 gap-6">

            <Field
              label="Full name"
              error={errors.fullName?.message}
            >
              <input
                {...register('fullName')}
                placeholder="Aarav Sharma"
                className="input"
              />
            </Field>


            <Field
              label="Roll number"
              error={errors.rollNumber?.message}
            >
              <input
                {...register('rollNumber')}
                placeholder="HCST2024CS041"
                className="input"
              />
            </Field>


            <Field
              label="Email"
              error={errors.email?.message}
            >
              <input
                {...register('email')}
                type="email"
                placeholder="name@hcst.edu.in"
                className="input"
              />
            </Field>


            <Field
              label="Phone"
              error={errors.phone?.message}
            >
              <input
                {...register('phone')}
                placeholder="+91 98765 43210"
                className="input"
              />
            </Field>

          </div>

        </Section>


        {/* ===================================================
            02 — ACADEMIC
            =================================================== */}

        <Section label="02 — ACADEMIC">

          <div className="grid sm:grid-cols-2 gap-6 mb-6">

            <Field
              label="Department"
              error={errors.department?.message}
            >
              <select
                {...register('department')}
                className="input"
              >
                <option value="">
                  Select department
                </option>

                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>
            </Field>


            <Field
              label="Year"
              error={errors.year?.message}
            >
              <select
                {...register('year')}
                className="input"
              >
                <option value="">
                  Select year
                </option>

                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </Field>

          </div>


          <Field
            label="College name"
            error={errors.collegeName?.message}
          >
            <input
              {...register('collegeName')}
              placeholder="Your college or institute"
              className="input"
            />
          </Field>

        </Section>


        {/* ===================================================
            03 — TRACK
            =================================================== */}

        <Section label="03 — TRACK">

          <div className="flex flex-wrap gap-2.5">

            {tracks.map((track) => (
              <button
                type="button"
                key={track}
                onClick={() =>
                  setValue(
                    'track',
                    track,
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }
                className={`text-sm px-5 py-2.5 rounded-full border transition-colors ${
                  selectedTrack === track
                    ? 'bg-signal-tint border-signal text-signal-dark'
                    : 'border-rule text-muted hover:border-signal/60 hover:text-ink'
                }`}
              >
                {track}
              </button>
            ))}

          </div>


          {errors.track && (
            <p className="text-xs text-warn mt-3">
              {errors.track.message}
            </p>
          )}

        </Section>


        {/* ===================================================
            04 — ABSTRACT
            =================================================== */}

        {needsAbstract && (
          <Section label="04 — ABSTRACT">

            <div className="space-y-6">

              <Field
                label="Abstract title"
                error={errors.abstractTitle?.message}
              >
                <input
                  {...register('abstractTitle')}
                  placeholder="Title of your paper or poster"
                  className="input"
                />
              </Field>


              <Field
                label="Abstract — type it here, or upload a PDF below"
                error={errors.abstractText?.message}
              >
                <textarea
                  {...register('abstractText')}
                  rows={6}
                  placeholder="Summarize your work in 150–250 words"
                  className="input resize-none"
                />
              </Field>


              {/* PDF UPLOAD */}

              <div>

                {!abstractFile ? (

                  <label className="flex items-center gap-3 border border-dashed border-rule rounded-xl px-5 py-4 cursor-pointer hover:border-signal transition-colors">

                    <UploadCloud
                      size={18}
                      className="text-signal-dark shrink-0"
                    />

                    <span className="text-sm text-muted">
                      Upload a PDF instead — up to 10MB
                    </span>

                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                  </label>

                ) : (

                  <div className="flex items-center gap-3 border border-byte/40 bg-byte-tint rounded-xl px-5 py-4">

                    <FileCheck2
                      size={18}
                      className="text-byte shrink-0"
                    />

                    <span className="text-sm text-byte truncate flex-1">
                      {abstractFile.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setAbstractFile(null)
                        setFileError('')
                      }}
                      aria-label="Remove file"
                      className="text-muted hover:text-warn transition-colors"
                    >
                      <X size={16} />
                    </button>

                  </div>

                )}

                {fileError && (
                  <p className="text-xs text-warn mt-2">
                    {fileError}
                  </p>
                )}

              </div>

            </div>

          </Section>
        )}


        {/* ===================================================
            SERVER ERROR
            =================================================== */}

        {serverError && (
          <p className="text-sm text-warn bg-warn-tint px-5 py-4 rounded-xl">
            {serverError}
          </p>
        )}


        {/* ===================================================
            SUBMIT
            =================================================== */}

        <div className="border-t border-rule pt-8 flex flex-wrap items-center justify-between gap-4">

          <span className="text-sm text-muted">
            Registration fee

            <span className="font-mono text-byte ml-1">
              Free
            </span>
          </span>


          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-signal hover:text-white transition-colors disabled:opacity-60"
          >
            {submitting
              ? 'Submitting…'
              : 'Submit registration'}

            {!submitting && (
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            )}
          </button>

        </div>

      </motion.form>

    </div>
  )
}


/* =========================================================
   SECTION COMPONENT
   ========================================================= */

function Section({ label, children }) {
  return (
    <div>

      <p className="font-mono text-xs text-muted mb-5">
        {label}
      </p>

      {children}

    </div>
  )
}


/* =========================================================
   FIELD COMPONENT
   ========================================================= */

function Field({
  label,
  error,
  children,
}) {
  return (
    <label className="block">

      <span className="text-sm text-muted block mb-2">
        {label}
      </span>

      {children}

      {error && (
        <span className="text-xs text-warn mt-1.5 block">
          {error}
        </span>
      )}

    </label>
  )
}
