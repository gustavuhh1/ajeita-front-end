"use client"

import React, {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  Bell,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface Notification {
  id: number
  type: "accepted" | "declined"
  proName: string
  message: string
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "accepted",
    proName: "João Silva",
    message:
      "Aceitou seu pedido de eletricista.",
  },
  {
    id: 2,
    type: "declined",
    proName: "Ana Costa",
    message:
      "Recusou o pedido por falta de agenda.",
  },
]

export default function NotificationBell() {
  const [isOpen, setIsOpen] =
    useState(false)

  const containerRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="relative rounded-full p-2 text-gray-600 transition-all hover:bg-gray-100"
      >
        <Bell size={20} />

        {NOTIFICATIONS.length > 0 && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in absolute right-0 top-12 z-50 w-80 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl duration-200">
          <h4 className="px-2 pb-3 text-sm font-black text-gray-950">
            Notificações
          </h4>

          <div className="max-h-[300px] space-y-1 overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <div
                key={n.id}
                className="flex cursor-pointer gap-3 rounded-2xl p-3 transition-colors hover:bg-gray-50"
              >
                <div
                  className={`mt-1 ${
                    n.type === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {n.type ===
                  "accepted" ? (
                    <CheckCircle2
                      size={16}
                    />
                  ) : (
                    <XCircle
                      size={16}
                    />
                  )}
                </div>

                <div>
                  <p className="leading-tight text-sm font-bold text-gray-900">
                    {n.proName}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {n.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}