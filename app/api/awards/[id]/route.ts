import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

type Context = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, context: Context) {
  try {
    const params = await context.params
    const id = params.id
    if (!id) return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 })

    const db = await getDb()
    const award = await db.collection("awards").findOne({ _id: new ObjectId(id) })
    if (!award) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 })

    return NextResponse.json({
      success: true,
      data: { ...award, _id: award._id.toString() },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch award", error: String(error) },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const params = await context.params
    const id = params.id
    if (!id) return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 })

    const body = await request.json()
    const { title, year, description, imageUrl } = body

    const update: Record<string, unknown> = { updatedAt: new Date() }
    if (title !== undefined) update.title = title
    if (year !== undefined) update.year = Number(year)
    if (description !== undefined) update.description = description
    if (imageUrl !== undefined) update.imageUrl = imageUrl

    const db = await getDb()
    const result = await db.collection("awards").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    )
    if (!result) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 })

    return NextResponse.json({
      success: true,
      data: { ...result, _id: result._id.toString() },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update award", error: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const params = await context.params
    const id = params.id
    if (!id) return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 })

    const db = await getDb()
    const result = await db.collection("awards").deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete award", error: String(error) },
      { status: 500 }
    )
  }
}
