import message from '@config/message'

export default function(e) {
  return message[e.message] || undefined
}
