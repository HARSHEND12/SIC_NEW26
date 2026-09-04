import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, FileCheck2, X, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient.js'

const tracks = ['Paper presentation', 'Project demo', 'Poster', 'Attendee only']
const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Other']
const years = ['1st year', '2nd year', '3rd year', '4th year']
const abstractTracks = ['Paper presentation', 'Poster']
const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10MB, matches the bucket's file_size_limit

const schema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  rollNumber: z.string().min(3, 'Enter your roll number'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  department: z.string().min(1),
  year: z.string().min(1),
  collegeName: z.string().min(2, 'Enter your college name'),
  track: z.string().min(1, 'Select a track'),
  abstractTitle: z.string().optional(),
  abstractText: z.string().optional(),
})

export default function Register() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [abstractFile, setAbstractFile] = useState(null)
  const [fileError, setFileError] = useState('')
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
      collegeName: 'Hindustan College of Science and Technology, Farah (Mathura)',
    },
  })

  const selectedTrack = watch('track')
  const needsAbstract = abstractTracks.includes(selectedTrack)

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    setFileError('')
    if (!file) {
      setAbstractFile(null)
      return
    }
    if (file.type !== 'application/pdf') {
      setFileError('Only PDF files are accepted.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError('File is larger than 10MB. Compress it and try again.')
      e.target.value = ''
      return
    }
    setAbstractFile(file)
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    setServerError('')

    if (needsAbstract && !data.abstractText?.trim() && !abstractFile) {
      setServerError('Add an abstract — either type it or upload a PDF.')
      setSubmitting(false)
      return
    }

    try {
      let abstractFilePath = null

      if (needsAbstract && abstractFile) {
        const path = `${crypto.randomUUID()}.pdf`
        const { error: uploadError } = await supabase.storage
          .from('abstracts')
          .upload(path, abstractFile, { contentType: 'application/pdf' })
        if (uploadError) throw new Error(`Could not upload PDF: ${uploadError.message}`)
        abstractFilePath = path
      }

      const { data: reg, error: insertError } = await supabase
        .from('registrations')
        .insert({
          full_name: data.fullName,
          roll_number: data.rollNumber,
          email: data.email.trim().toLowerCase(),
          phone: data.phone,
          department: data.department,
          year: data.year,
          college_name: data.collegeName,
          track: data.track,
          abstract_title: needsAbstract ? data.abstractTitle : null,
          abstract_text: needsAbstract ? data.abstractText : null,
          abstract_file_path: abstractFilePath,
          status: 'submitted',
        })
        .select()
        .single()

      if (insertError) {
        if (insertError.code === '23505') {
          // Postgres unique_violation — this email already has a registration.
          throw new Error(
            'You\u2019ve already registered with this email. Use "Check status" in the top nav to find your ticket.'
          )
        }
        throw insertError
      }

      // Fire-and-forget — email failure should never block registration.
      supabase.functions
        .invoke('send-status-email', {
          body: {
            email: reg.email,
            fullName: reg.full_name,
            status: 'submitted',
            registrationId: reg.id,
          },
        })
        .catch(() => {})

      navigate(`/ticket/${reg.id}`)
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16 relative">
      <div className="absolute -top-10 right-0 w-72 h-72 rounded-full bg-signal/15 blur-[90px] -z-10" />

      <p className="font-mono text-xs text-signal-dark mb-2">Registration — free</p>
      <h1 className="font-display text-3xl mb-2">
        Register for <span className="gradient-text">SIC 2026</span>
      </h1>
      <p className="text-muted text-sm mb-10">
        Registration and abstract submission are free. Our team reviews every submission
        and shortlists participants for the final round, held in college — only shortlisted
        participants pay a ₹100 confirmation fee at that stage.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 sm:p-8 space-y-6" noValidate>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" error={errors.fullName?.message}>
            <input {...register('fullName')} placeholder="Aarav Sharma" className="input" />
          </Field>
          <Field label="Roll number" error={errors.rollNumber?.message}>
            <input {...register('rollNumber')} placeholder="HCST2024CS041" className="input" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email" error={errors.email?.message}>
            <input {...register('email')} type="email" placeholder="name@hcst.edu.in" className="input" />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register('phone')} placeholder="+91 98765 43210" className="input" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Department" error={errors.department?.message}>
            <select {...register('department')} className="input">
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Year" error={errors.year?.message}>
            <select {...register('year')} className="input">
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="College name" error={errors.collegeName?.message}>
          <input {...register('collegeName')} placeholder="Your college or institute" className="input" />
        </Field>

        <div>
          <p className="text-sm text-muted mb-2">Track</p>
          <div className="flex flex-wrap gap-2">
            {tracks.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setValue('track', t, { shouldValidate: true })}
                className={`text-sm px-4 py-2 rounded-full border transition-all ${
                  selectedTrack === t
                    ? 'bg-signal-tint border-signal text-signal-dark shadow-glow-soft'
                    : 'border-rule text-muted hover:border-signal hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.track && <p className="text-xs text-warn mt-2">{errors.track.message}</p>}
        </div>

        {needsAbstract && (
          <div className="border border-rule rounded-xl p-4 space-y-4 bg-surface/40">
            <p className="text-sm font-medium text-ink">Abstract details</p>
            <Field label="Abstract title" error={errors.abstractTitle?.message}>
              <input {...register('abstractTitle')} placeholder="Title of your paper or poster" className="input" />
            </Field>
            <Field label="Abstract (type it, or upload a PDF below)" error={errors.abstractText?.message}>
              <textarea
                {...register('abstractText')}
                rows={5}
                placeholder="Summarize your work in 150–250 words"
                className="input resize-none"
              />
            </Field>

            <div>
              <p className="text-sm text-muted mb-1.5">Or upload a PDF instead</p>
              {!abstractFile ? (
                <label className="flex items-center gap-3 border border-dashed border-rule rounded-lg px-4 py-3.5 cursor-pointer hover:border-signal hover:bg-signal-tint/40 transition-colors">
                  <UploadCloud size={18} className="text-signal-dark shrink-0" />
                  <span className="text-sm text-muted">Click to choose a PDF, up to 10MB</span>
                  <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </label>
              ) : (
                <div className="flex items-center gap-3 border border-byte/40 bg-byte-tint rounded-lg px-4 py-3.5">
                  <FileCheck2 size={18} className="text-byte shrink-0" />
                  <span className="text-sm text-byte truncate flex-1">{abstractFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setAbstractFile(null)}
                    aria-label="Remove file"
                    className="text-muted hover:text-warn transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {fileError && <p className="text-xs text-warn mt-1.5">{fileError}</p>}
            </div>
          </div>
        )}

        {serverError && (
          <p className="text-sm text-warn bg-warn-tint px-4 py-3 rounded-lg">{serverError}</p>
        )}

        <div className="border-t border-rule pt-6 flex items-center justify-between">
          <span className="text-sm text-muted">
            Registration fee: <span className="font-mono text-byte">Free</span>
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-aurora bg-[length:200%_200%] hover:bg-[position:100%_50%] hover:shadow-glow-violet transition-all disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Submit registration'}
            {!submitting && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm text-muted block mb-1.5">{label}</span>
      {children}
      {error && <span className="text-xs text-warn mt-1 block">{error}</span>}
    </label>
  )
}