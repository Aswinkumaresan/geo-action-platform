import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, Check, MapPin, Save, Send } from "lucide-react";

const steps = ["Case Details", "Seizure Info", "Accused", "Vehicle", "Review"];

const schema = z.object({
  district: z.string().min(1, "Required"),
  unit: z.string().min(1, "Required"),
  checkpost: z.string().optional(),
  contrabandType: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  unit_qty: z.string().min(1, "Required"),
  accusedName: z.string().min(2, "Required"),
  accusedAge: z.string().optional(),
  vehicleNo: z.string().optional(),
  vehicleType: z.string().optional(),
  gpsLat: z.string().optional(),
  gpsLng: z.string().optional(),
  remarks: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const districts = ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"];
const contrabandTypes = ["Cannabis / Ganja", "Heroin", "MDMA / Ecstasy", "Cocaine", "Methamphetamine", "Psychotropic Pills", "Arrack / IMFL", "Counterfeit Goods", "Tobacco Products"];

export function DSRPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleNext = async () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4">
          <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto" style={{ background: "hsl(var(--risk-low) / 0.15)" }}>
            <Check className="h-8 w-8" style={{ color: "hsl(var(--risk-low))" }} />
          </div>
          <h2 className="text-xl font-bold">DSR Submitted Successfully</h2>
          <p style={{ color: "hsl(var(--muted-foreground))" }}>Case ID: <span className="font-mono text-accent">CS-2025-{Math.floor(Math.random() * 9000) + 1000}</span></p>
          <button onClick={() => { setSubmitted(false); setCurrentStep(0); }} className="mt-4 px-6 py-2 rounded-lg text-sm font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            New Entry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: i < currentStep ? "hsl(var(--risk-low))" : i === currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    color: i <= currentStep ? "#fff" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <p className="text-[10px] mt-1 font-medium text-center" style={{ color: i === currentStep ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}>
                  {step}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="h-0.5 w-12 mx-1 mb-4 transition-all" style={{ background: i < currentStep ? "hsl(var(--risk-low))" : "hsl(var(--border))" }} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="stat-card space-y-5">
            {currentStep === 0 && (
              <>
                <h3 className="text-base font-semibold">Case Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>District *</label>
                    <select {...register("district")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: errors.district ? "hsl(var(--risk-high))" : "hsl(var(--border))" }}>
                      <option value="">Select District</option>
                      {districts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    {errors.district && <p className="text-xs mt-1" style={{ color: "hsl(var(--risk-high))" }}>{errors.district.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Unit *</label>
                    <select {...register("unit")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: errors.unit ? "hsl(var(--risk-high))" : "hsl(var(--border))" }}>
                      <option value="">Select Unit</option>
                      {["STF", "CIU", "District", "Anti-Narcotics", "Customs"].map(u => <option key={u}>{u}</option>)}
                    </select>
                    {errors.unit && <p className="text-xs mt-1" style={{ color: "hsl(var(--risk-high))" }}>{errors.unit.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Checkpost (Optional)</label>
                    <input {...register("checkpost")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: "hsl(var(--border))" }} placeholder="Enter checkpost name" />
                  </div>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <h3 className="text-base font-semibold">Seizure Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Contraband Type *</label>
                    <select {...register("contrabandType")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: errors.contrabandType ? "hsl(var(--risk-high))" : "hsl(var(--border))" }}>
                      <option value="">Select Type</option>
                      {contrabandTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Quantity *</label>
                      <input {...register("quantity")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: "hsl(var(--border))" }} placeholder="0.00" />
                    </div>
                    <div className="w-24">
                      <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Unit *</label>
                      <select {...register("unit_qty")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: "hsl(var(--border))" }}>
                        <option value="">-</option>
                        {["kg", "g", "mg", "L", "mL", "nos"].map(u => <option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>GPS Location</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
                        <input {...register("gpsLat")} className="w-full rounded-md border pl-8 pr-3 py-2 text-sm bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Latitude" />
                      </div>
                      <div className="relative flex-1">
                        <input {...register("gpsLng")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Longitude" />
                      </div>
                      <button type="button" className="px-3 py-2 rounded-md text-xs font-medium" style={{ background: "hsl(var(--accent) / 0.15)", color: "hsl(var(--accent))" }}>Auto</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h3 className="text-base font-semibold">Accused Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Full Name *</label>
                    <input {...register("accusedName")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none focus:ring-1" style={{ borderColor: errors.accusedName ? "hsl(var(--risk-high))" : "hsl(var(--border))" }} placeholder="Name of accused" />
                    {errors.accusedName && <p className="text-xs mt-1" style={{ color: "hsl(var(--risk-high))" }}>{errors.accusedName.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Age</label>
                    <input {...register("accusedAge")} type="number" className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Age" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Remarks</label>
                    <textarea {...register("remarks")} rows={3} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none resize-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Additional details..." />
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h3 className="text-base font-semibold">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Vehicle Number</label>
                    <input {...register("vehicleNo")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none font-mono uppercase" style={{ borderColor: "hsl(var(--border))" }} placeholder="KL-01-AB-1234" />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>Vehicle Type</label>
                    <select {...register("vehicleType")} className="w-full rounded-md border px-3 py-2 text-sm bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }}>
                      <option value="">Select Type</option>
                      {["Two-wheeler", "Auto Rickshaw", "Car", "Jeep", "Van", "Lorry", "Bus", "None"].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h3 className="text-base font-semibold">Review & Submit</h3>
                <div className="rounded-lg p-4 space-y-3" style={{ background: "hsl(var(--muted))" }}>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Please review all details before submitting. Once submitted, the case will be assigned a unique case ID and routed to the appropriate unit.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4" style={{ color: "hsl(var(--risk-low))" }} />
                    <span>Case Details filled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4" style={{ color: "hsl(var(--risk-low))" }} />
                    <span>Seizure information recorded</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4" style={{ color: "hsl(var(--risk-low))" }} />
                    <span>Accused details captured</span>
                  </div>
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "hsl(var(--border))" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
              >
                Back
              </button>
              <div className="flex gap-2">
                <button type="button" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                  <Save className="h-3.5 w-3.5" /> Draft
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium"
                    style={{ background: "hsl(var(--risk-low))", color: "#fff" }}
                  >
                    <Send className="h-3.5 w-3.5" /> Submit DSR
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
