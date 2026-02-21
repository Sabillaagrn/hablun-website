type Props = {
  label: string
  title: string
  description: string[]
}

export default function SegmentCard({
  label,
  title,
  description
}: Props) {
  return (
    <div className="group relative p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
      <p className="text-xs tracking-[0.35em] uppercase text-islamic-green-600 mb-6">
        {label}
      </p>

      <h4 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-islamic-green-700 transition-colors">
        {title}
      </h4>

      {description.map((text, index) => (
        <p
          key={index}
          className={`text-gray-600 leading-relaxed ${
            index !== description.length - 1 ? "mb-4" : ""
          }`}
        >
          {text}
        </p>
      ))}

      <div className="mt-8 w-12 h-[2px] bg-islamic-green-600 group-hover:w-20 transition-all duration-300" />
    </div>
  )
}
