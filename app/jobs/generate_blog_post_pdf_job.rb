# frozen_string_literal: true

require "wicked_pdf"

class GenerateBlogPostPdfJob < ApplicationJob
  queue_as :default

  def perform(user_id, slug)
    post = Post.find_by!(slug: slug)

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })

    pdf_html = ApplicationController.render(
      template: "posts/pdf",
      layout: "pdf",
      assigns: { post: post }
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })

    pdf_file = WickedPdf.new.pdf_from_string(
      pdf_html,
      header: {
        html: {
          template: "layouts/pdf_header",
          layout: false
        }
      },
      footer: {
        html: {
          template: "layouts/pdf_footer",
          layout: false
        }
      }
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.upload"), progress: 75 })

    post.pdf_file.attach(
      io: StringIO.new(pdf_file),
      filename: "#{post.title.parameterize}.pdf",
      content_type: "application/pdf"
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.attach"), progress: 100 })
  end
end
