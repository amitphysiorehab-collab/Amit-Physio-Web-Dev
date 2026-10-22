import { ServiceItem } from "@/types";

export const servicesData: ServiceItem[] = [
  {
    id: "orthopedic-rehabilitation",
    slug: "orthopedic-rehab",
    title: "Orthopedic Rehabilitation",
    shortDescription:
      "Specialized recovery programs for joint replacements, arthritis, fractures, and musculoskeletal conditions.",
    fullDescription:
      "Our Orthopedic Rehabilitation program focuses on restoring maximum joint function, reducing chronic pain, and rebuilding muscular strength after injury or surgery. Using evidence-based manual therapy, targeted therapeutic exercise, and progressive load training, our licensed specialists guide you toward active, pain-free daily living.",
    conditions: [
      "Total Knee Replacement (TKR) & Hip Replacement (THR)",
      "Osteoarthritis and Rheumatoid Arthritis management",
      "Rotator Cuff and Shoulder impingement syndromes",
      "Post-fracture stiffness and joint immobilization recovery",
      "Frozen shoulder (Adhesive Capsulitis)",
    ],
    techniques: [
      "Mobilization and gentle manual therapy",
      "Resistance bands and isometric strength building",
      "Electrotherapy and therapeutic ultrasound for pain control",
      "Gait and balance re-education",
    ],
    sessionDuration: "45 – 60 minutes",
    iconName: "Bone",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: "neurological-rehabilitation",
    slug: "neuro-rehab",
    title: "Neurological Rehabilitation",
    shortDescription:
      "Compassionate, structured neuro-physiotherapy for stroke, paralysis, Parkinson's disease, and neuropathies.",
    fullDescription:
      "Neurological rehabilitation helps individuals rewire neural pathways through neuroplasticity-focused therapy. Our clinical team works closely with patients and families to recover motor control, reduce spasticity, enhance coordination, and regain functional independence in everyday life.",
    conditions: [
      "Stroke recovery (Hemiplegia / Paraplegia)",
      "Parkinson's disease mobility & tremor management",
      "Facial palsy / Bell's palsy facial muscle retraining",
      "Spinal cord injury rehabilitation",
      "Peripheral neuropathy and sensory loss",
    ],
    techniques: [
      "Neuro-developmental therapy (NDT) & Bobath approach",
      "Proprioceptive neuromuscular facilitation (PNF)",
      "Parallel bar walking and bodyweight-supported gait training",
      "Fine motor coordination and functional task retraining",
    ],
    sessionDuration: "60 minutes",
    iconName: "Brain",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: "sports-injury-recovery",
    slug: "sports-injury",
    title: "Sports Injury Recovery",
    shortDescription:
      "Accelerated recovery and biomechanical conditioning for athletes, fitness enthusiasts, and weekend warriors.",
    fullDescription:
      "Whether you are dealing with a ligament tear, acute muscle strain, or chronic overuse condition, our sports injury protocol combines targeted rehabilitation with performance conditioning to get you back on the field safely without recurring injuries.",
    conditions: [
      "ACL / PCL / Meniscus tears and post-op rehabilitation",
      "Ankle sprains and chronic ankle instability",
      "Tennis elbow, golfer's elbow, and wrist tendonitis",
      "Hamstring and quadriceps muscle tears",
      "Shin splints and Achilles tendinopathy",
    ],
    techniques: [
      "Kinetic chain assessment and running analysis",
      "Eccentric overload training and plyometrics",
      "Kinesiology taping and sports soft-tissue release",
      "Return-to-sport agility and sport-specific drills",
    ],
    sessionDuration: "45 – 60 minutes",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: "spine-postural-correction",
    slug: "spine-posture",
    title: "Spine & Postural Care",
    shortDescription:
      "Comprehensive treatment for chronic back pain, herniated discs, sciatica, neck stiffness, and postural alignment.",
    fullDescription:
      "Sedentary desk routines and degenerative changes often lead to severe spinal pressure and postural strain. Our spine specialists employ mechanical diagnosis, core stabilization, and ergonomic corrections to alleviate nerve irritation and permanently strengthen spinal support.",
    conditions: [
      "Cervical spondylosis and chronic neck pain",
      "Lumbar disc herniation, slip disc, and sciatica",
      "Scoliosis and postural kyphosis",
      "Upper crossed syndrome and forward head posture",
      "Ankylosing spondylitis spinal mobility care",
    ],
    techniques: [
      "McKenzie mechanical diagnosis and therapy (MDT)",
      "Core neuromuscular stabilization and pelvic re-alignment",
      "Spinal decompression and targeted traction",
      "Workplace ergonomic workstation assessments",
    ],
    sessionDuration: "45 minutes",
    iconName: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: "geriatric-fall-prevention",
    slug: "geriatric-therapy",
    title: "Geriatric & Fall Prevention",
    shortDescription:
      "Gentle, dedicated physical therapy focused on mobility, balance confidence, joint preservation, and senior vitality.",
    fullDescription:
      "Age-related decline in muscle mass, bone density, and balance can significantly restrict independence. We offer tailored, safe senior therapy routines designed to prevent falls, maintain joint flexibility, and preserve the joy of independent movement.",
    conditions: [
      "Frequent loss of balance and fear of falling",
      "Generalized muscle weakness (Sarcopenia)",
      "Osteoporosis and posture collapse",
      "Post-bedrest deconditioning",
      "Dementia-friendly mobility preservation",
    ],
    techniques: [
      "Dynamic balance and vestibular stabilization",
      "Sit-to-stand and transfer mechanics training",
      "Assistive device prescription and correct walker usage",
      "Gentle joint mobilization and light resistance exercises",
    ],
    sessionDuration: "40 – 50 minutes",
    iconName: "HeartHandshake",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: "post-surgical-rehab",
    slug: "post-surgical",
    title: "Post-Surgical Rehabilitation",
    shortDescription:
      "Carefully calibrated milestone recovery following orthopedic, spinal, and reconstructive surgeries.",
    fullDescription:
      "Safe post-surgical recovery requires close clinical monitoring to avoid compromising surgical repairs while actively preventing scar tissue contractures. We coordinate with your operating surgeon's protocol to ensure safe, methodical healing.",
    conditions: [
      "Post-arthroscopic ligament reconstructions",
      "Spinal fusion and laminectomy recovery",
      "Open reduction internal fixation (ORIF) for fractures",
      "Tendon transfer and tendon repair rehabilitation",
      "Post-mastectomy lymphedema and mobility therapy",
    ],
    techniques: [
      "Gentle passive range-of-motion progression",
      "Scar tissue mobilization and desensitization",
      "Edema lymphatic drainage and compression guidance",
      "Progressive functional strength restoration",
    ],
    sessionDuration: "50 minutes",
    iconName: "Stethoscope",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=75",
  },
];
