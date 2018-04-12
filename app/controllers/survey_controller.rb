class SurveyController < ApplicationController
    def survey
    end
    def thanks
    end
    def respond
        puts response_params
        @response = Response.create!(response_params)
        redirect_to thanks_url
    end

    private
    def response_params
        response = params.require(:response)
        response.permit(:count_simultaneous_applications, 
                        :how_tracking, 
                        :what_extra_documents, 
                        :what_document_creation_softwares,
                        :count_different_cvs,
                        :what_update_frequency
                       )
    end
end
