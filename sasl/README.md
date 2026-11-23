# Lula SASL sign-video dictionary

Lula can show a **South African Sign Language (SASL)** sign for every keyword and library name.
Hover a word such as `uma`, `ukuba`, `haeba` or `as` in VS Code and choose **🤟 Show SASL sign**.

Each sign belongs to one C++ **concept** (`if`, `while`, `push_back`, `#include`, ...). Every SA
language maps its words to the same concepts, so **one recording serves all ten languages**.

## Who records the signs

**Signs must come from Deaf SASL signers.** This dictionary has no made-up or machine-generated signs,
and none may be added. Many programming ideas don't have an established SASL sign yet. Deciding on those
signs is for the Deaf community: Deaf programmers, SASL teachers, interpreters and schools for the Deaf.

Good partners to approach include schools for the Deaf, university SASL and Deaf Studies departments,
Deaf organisations, and accredited SASL interpreters (for review, alongside Deaf signers).

## Status

Run `lula sasl status`. See [RECORDING_LIST.md](RECORDING_LIST.md) for every concept, the 49 priority
concepts to record first, and the word for each concept in all ten languages.

## Recording guidelines

- **One sign per clip**, 2–6 seconds. Start and end with the hands resting, so the clip loops cleanly.
- **Framing:** from the waist to just above the head, with both hands always in frame. Use a plain, contrasting
  background and even lighting with no strong shadows on the face. Facial expression is part of SASL.
- **Format:** `.webm` or `.mp4`, at least 720p, under 20 MB. No sound is needed. `lula sasl add` converts `.mp4`
  to `.webm` when ffmpeg is installed, because some VS Code versions can't play H.264 `.mp4`.
- **Where relevant, sign a short example as well** (for example, the sign for IF used in "if the sensor sees
  an obstacle"). Add it as a separate clip in the `note`, or record it in the same clip after a pause.
- If there are regional variants, record the one your community uses and set `--region`.

## Consent and credit

Every clip needs the signer's **informed consent** to publish it. The tool refuses to add a sign without
`--consent`. Credit the signer by name (or a name they choose) and choose a licence. We recommend
**CC-BY-4.0**, so schools can reuse the clips with credit. Signers can ask for their clip to be removed
at any time: `lula sasl remove <concept>`.

## Adding a sign

```bash
node bin/lula.js sasl add if recordings/if.mp4 \
  --signer "Nomsa D." --license CC-BY-4.0 --consent \
  --gloss IF --region Gauteng --reviewed-by "SASL teacher name"
node bin/lula.js sasl check     # validates the whole dictionary
node bin/lula.js sasl list -o sasl/RECORDING_LIST.md
```

To keep large collections out of the repository, host the videos elsewhere and give an `https://` URL
instead of a file. A school can also keep its own dictionary folder (`signs.json` + `videos/`) and point
VS Code at it with the `lula.sasl.dictionaryPath` setting.

## File format: `signs.json`

```json
{
  "version": 1,
  "signs": {
    "if": {
      "video": "if.mp4",
      "gloss": "IF",
      "signer": "Nomsa D.",
      "license": "CC-BY-4.0",
      "consent": true,
      "region": "Gauteng",
      "reviewedBy": "...",
      "note": "Optional explanation",
      "added": "2026-11-23"
    }
  }
}
```
