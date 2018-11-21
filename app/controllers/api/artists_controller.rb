class Api::ArtistsController < ApplicationController
  respond_to :json
  def show
    @artist = Artist.find(params[:id])
    render json: @artist
  end

  def index
    artists = Artist.all
    render json: artists
  end

  def update
    artist = Artist.find(params[:id])
    new_work = work.update(params)
    render_json_message(:ok, message: 'Artist successfully updated!')
  end

  def destroy
    artist = Artist.find(params[:id])
    if artist.destroy
      render_json_message(:ok, message: 'Artist successfully deleted')
    else
      render_json_message(:forbidden, errors: artist.errors.full_messages)
    end
  end

  def works
    artist = Artist.find(params[:id])
    works = artist.works
    if works
      render json: works
    else
      render_json_message(:forbidden, errors: works.errors.full_messages)
    end
  end

  def requests
    artist = Artist.find(params[:id])
    requests = artist.requests
    requests_full = []
    requests.each do |request|
      this_request = {}
      this_request["request"] = request
      this_request["buyer"] = request.buyer
      this_request["receipt"] = request.receipt
      requests_full.append(this_request)
    end
    if requests
      render json: requests_full.to_json
    else
      render_json_message(:forbidden, errors: requests.errors.full_messages)
    end
  end

  def receipts
    artist = Artist.find(params[:id])
    receipts = artist.receipts
    render json: receipts,
        each_serializer: ReceiptSerializer
  end

end
